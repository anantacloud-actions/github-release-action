const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(token);

    const { owner, repo } = github.context.repo;

    const tag = core.getInput("tag", { required: true });
    const name = core.getInput("name", { required: true });
    const body = core.getInput("body") || "";
    const draft = core.getInput("draft") === "true";
    const prerelease = core.getInput("prerelease") === "true";

    core.info(`🚀 Creating release ${name} (${tag})`);

    const response = await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: tag,
      name: name,
      body: body,
      draft: draft,
      prerelease: prerelease
    });

    core.setOutput("release_url", response.data.html_url);
    core.info(`✅ Release created: ${response.data.html_url}`);

  } catch (error) {
    core.setFailed(`❌ Release failed: ${error.message}`);
  }
}

run();
