const core = require("@actions/core");
const github = require("@actions/github");

function bumpPatch(version) {
  const match = version.match(/v?(\d+)\.(\d+)\.(\d+)/);
  if (!match) return "v1.0.0";

  return `v${match[1]}.${match[2]}.${parseInt(match[3]) + 1}`;
}

async function getLatestTag(octokit, owner, repo) {
  const tags = await octokit.rest.repos.listTags({
    owner,
    repo,
    per_page: 1
  });

  return tags.data.length ? tags.data[0].name : null;
}

async function generateChangelog(octokit, owner, repo, baseTag) {
  core.info(`Generating changelog from ${baseTag} → HEAD`);

  const comparison = await octokit.rest.repos.compareCommits({
    owner,
    repo,
    base: baseTag,
    head: "HEAD"
  });

  const prs = new Map();

  for (const commit of comparison.data.commits) {
    const matches = commit.commit.message.match(/#(\d+)/g) || [];

    for (const match of matches) {
      const prNumber = parseInt(match.replace("#", ""));
      prs.set(prNumber, true);
    }
  }

  if (prs.size === 0) {
    return "## 🚀 Release Notes\n\nNo significant changes.\n";
  }

  const sections = {
    "🚀 Features": [],
    "🐛 Fixes": [],
    "🧹 Chores": []
  };

  for (const prNumber of prs.keys()) {
    const { data: pr } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber
    });

    const labels = pr.labels.map(l => l.name);

    if (labels.includes("enhancement")) {
      sections["🚀 Features"].push(pr);
    } else if (labels.includes("bug")) {
      sections["🐛 Fixes"].push(pr);
    } else {
      sections["🧹 Chores"].push(pr);
    }
  }

  let changelog = "## 🚀 Release Notes\n\n";

  for (const section in sections) {
    if (sections[section].length > 0) {
      changelog += `### ${section}\n`;

      for (const pr of sections[section]) {
        changelog += `- ${pr.title} (#${pr.number}) by @${pr.user.login}\n`;
      }

      changelog += "\n";
    }
  }

  return changelog;
}

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    let tag = core.getInput("tag");
    let name = core.getInput("name");
    let body = core.getInput("body");

    const generate = core.getInput("generate_changelog") === "true";
    const sinceInput = core.getInput("changelog_since");

    const draft = core.getInput("draft") === "true";
    const prerelease = core.getInput("prerelease") === "true";

    let baseTag = sinceInput || await getLatestTag(octokit, owner, repo);

    if (!tag) {
      if (!baseTag) {
        tag = "v1.0.0";
        core.info("No tags found → using v1.0.0");
      } else {
        tag = bumpPatch(baseTag);
        core.info(`Auto bump: ${baseTag} → ${tag}`);
      }
    }

    if (!name) {
      name = `${tag} — Release`;
    }

    if (!body && generate) {
      if (!baseTag) {
        body = "## 🚀 Release Notes\n\nInitial release 🎉\n";
      } else {
        body = await generateChangelog(octokit, owner, repo, baseTag);
      }
    }

    const response = await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: tag,
      name,
      body,
      draft,
      prerelease
    });

    core.info(`✅ Release created: ${response.data.html_url}`);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
