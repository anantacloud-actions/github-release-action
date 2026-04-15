/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

function parseVersion(tag) {
  const match = tag && tag.match(/v?(\d+)\.(\d+)\.(\d+)/);
  if (!match) return null;
  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3])
  };
}

function bump(version, type) {
  if (!version) return "v1.0.0";

  let { major, minor, patch } = version;

  if (type === "major") {
    major++; minor = 0; patch = 0;
  } else if (type === "minor") {
    minor++; patch = 0;
  } else {
    patch++;
  }

  return `v${major}.${minor}.${patch}`;
}

async function detectBump(octokit, owner, repo, commits) {
  let bumpType = "patch";

  for (const commit of commits) {
    const match = commit.commit.message.match(/#(\d+)/);
    if (!match) continue;

    const prNumber = parseInt(match[1]);

    try {
      const { data: pr } = await octokit.rest.pulls.get({
        owner,
        repo,
        pull_number: prNumber
      });

      const labels = pr.labels.map(l => l.name);

      if (labels.includes("release:major")) return "major";
      if (labels.includes("release:minor")) bumpType = "minor";
    } catch {
      core.warning(`PR lookup failed for #${prNumber}`);
    }
  }

  return bumpType;
}

async function generateGitHubNotes(octokit, owner, repo, tag, previousTag) {
  const res = await octokit.rest.repos.generateReleaseNotes({
    owner,
    repo,
    tag_name: tag,
    previous_tag_name: previousTag || undefined
  });

  return res.data.body;
}

async function uploadArtifacts(octokit, uploadUrl, artifacts) {
  const files = artifacts.split(",").map(f => f.trim());

  for (const file of files) {
    if (!fs.existsSync(file)) {
      core.warning(`File not found: ${file}`);
      continue;
    }

    const data = fs.readFileSync(file);

    await octokit.rest.repos.uploadReleaseAsset({
      url: uploadUrl,
      headers: {
        "content-type": "application/octet-stream",
        "content-length": data.length
      },
      name: file.split("/").pop(),
      data
    });

    core.info(`Uploaded: ${file}`);
  }
}

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    let tag = core.getInput("tag");
    let name = core.getInput("name");
    let body = core.getInput("body");
    let bumpType = core.getInput("version_bump");

    const useGitHubNotes =
      core.getInput("generate_release_notes") === "true";

    const artifacts = core.getInput("artifacts");
    const draft = core.getInput("draft") === "true";
    const prerelease = core.getInput("prerelease") === "true";

    const tags = await octokit.rest.repos.listTags({
      owner,
      repo,
      per_page: 1
    });

    const latestTag = tags.data.length ? tags.data[0].name : null;
    const parsed = parseVersion(latestTag);

    const comparison = latestTag
      ? await octokit.rest.repos.compareCommits({
          owner,
          repo,
          base: latestTag,
          head: "HEAD"
        })
      : { data: { commits: [] } };

    const commits = comparison.data.commits;

    if (!tag) {
      if (bumpType === "auto") {
        bumpType = await detectBump(octokit, owner, repo, commits);
      }

      tag = bump(parsed, bumpType);
      core.info(`Version bump (${bumpType}): ${latestTag} → ${tag}`);
    }

    if (!name) {
      name = `${tag} — Release`;
    }

    if (!body) {
      if (useGitHubNotes) {
        core.info("Using GitHub generated release notes...");
        body = await generateGitHubNotes(
          octokit,
          owner,
          repo,
          tag,
          latestTag
        );
      } else {
        body = "## 🚀 Release\n\nChanges included in this release.";
      }
    }

    const release = await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: tag,
      name,
      body,
      draft,
      prerelease
    });

    core.info(`✅ Release created: ${release.data.html_url}`);

    if (artifacts) {
      await uploadArtifacts(octokit, release.data.upload_url, artifacts);
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

