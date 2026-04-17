# 🚀 GitHub Release Action

<img width="876" height="456" alt="image" src="https://github.com/user-attachments/assets/79b57ff2-0719-41da-a7c2-c2e0d51775fb" />

<p align="center">

[![Build](https://img.shields.io/github/actions/workflow/status/anantacloud-actions/github-release-action/release.yml?branch=main\&style=for-the-badge\&label=Build)](https://github.com/anantacloud-actions/github-release-action/actions)
[![Release](https://img.shields.io/github/v/release/anantacloud-actions/github-release-action?style=for-the-badge\&label=Latest)](https://github.com/anantacloud-actions/github-release-action/releases)
![Users](https://img.shields.io/badge/used%20by-developers-blueviolet?style=for-the-badge)
![Node](https://img.shields.io/badge/node-20.x-green?style=for-the-badge)
![Bundled](https://img.shields.io/badge/bundled-ncc-orange?style=for-the-badge)
![Dependabot](https://img.shields.io/badge/dependabot-enabled-blue?style=for-the-badge)
![License](https://img.shields.io/github/license/anantacloud-actions/github-release-action?style=for-the-badge)

</p>

<p align="center">
  <b>⚡ The easiest way to automate GitHub Releases — fully powered by your workflow</b>
</p>

<p align="center">
  <a href="#-30-second-setup">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-why-this-exists">Why</a> •
  <a href="#-examples">Examples</a>
</p>

## 🎬 See It In Action (10 sec)

<p align="center">
  <img src="docs/github-release-action.gif" width="800" alt="GitHub Release Action Demo"/>
  <br/>
  <em>Automated release creation with version bumping 🚀</em>
</p>

## 💥 Why This Exists

Most release workflows are:

* ❌ Manual and error-prone
* ❌ Inconsistent across teams
* ❌ Hard to scale

This action turns your CI/CD into:

> 🧠 **Self-driving releases with zero friction**

## ⚡ Features

* 🏷️ **Automatic semantic versioning**
* 🧠 **PR label–driven version bump**
* 🧾 **GitHub-native release notes**
* 📦 **Artifact uploads**
* 🔮 **Release preview in PR**
* ⚙️ **Zero-config mode**
* 🔐 **Enterprise-ready**

## 🚀 30-Second Setup

```yaml
- name: Create Release
  uses: anantacloud-actions/github-release-action@v1
```

👉 That’s it.
No config. No scripts. No headaches.

## 🎯 Real Usage

```yaml
- name: Release
  uses: anantacloud-actions/github-release-action@v1
  with:
    version_bump: auto
    artifacts: "dist/app.zip"
```

## 🧠 How It Works

```text
PR → Merge → Detect → Version → Notes → Release 🚀
```

## 🏷️ Smart Versioning

Control releases via PR labels:

| Label           | Result             |
| --------------- | ------------------ |
| `release:major` | 💥 Breaking change |
| `release:minor` | 🚀 Feature         |
| none            | 🐛 Patch           |

## 🧾 Beautiful Release Notes (Auto)

```md
## What's Changed

* feat: add API (#12)
* fix: resolve bug (#15)

## New Contributors

* @dev made their first contribution 🎉
```

## 🔮 Preview Before You Merge

Every PR shows future release notes:

```md
🔮 Release Preview

- feat: add dashboard (#45)
- fix: improve performance (#48)
```

## 📦 Upload Artifacts

```yaml
with:
  artifacts: "dist/app.zip,dist/report.json"
```

## ⚙️ Inputs

| Name                     | Description                  | Default |
| ------------------------ | ---------------------------- | ------- |
| `token`                  | GitHub Token                 | —       |
| `tag`                    | Custom tag                   | auto    |
| `name`                   | Release name                 | auto    |
| `body`                   | Release notes                | auto    |
| `version_bump`           | auto / major / minor / patch | auto    |
| `generate_release_notes` | Use GitHub notes             | true    |
| `artifacts`              | Files to upload              | —       |
| `draft`                  | Draft release                | false   |
| `prerelease`             | Pre-release                  | false   |

## 📤 Outputs

| Name          | Description |
| ------------- | ----------- |
| `tag`         | Final tag   |
| `release_url` | Release URL |

## 🎨 Customize Release Notes

Create:

```bash
.github/release.yml
```

```yaml
changelog:
  categories:
    - title: "🚀 Features"
      labels: ["enhancement"]
    - title: "🐛 Fixes"
      labels: ["bug"]
```

## 🆚 Why Not semantic-release?

| Feature           | This Action | semantic-release |
| ----------------- | ----------- | ---------------- |
| Setup             | ⚡ 1 step    | ❌ Complex        |
| GitHub-native     | ✅ Yes       | ⚠️ Partial       |
| PR-based workflow | ✅ Yes       | ❌ No             |
| Learning curve    | 🟢 Low      | 🔴 High          |

## 🧠 Designed For

* DevOps engineers
* Platform teams
* Open source maintainers
* Anyone tired of manual releases

## 🏆 What You Gain

* ⏱️ Save hours every week
* 🔐 Reduce human error
* 📦 Standardize releases
* 🚀 Ship faster

## ⭐ Star This Repo

If this saved you time:

- 👉 **Give it a star** ⭐
- 👉 Helps others discover it
- 👉 Motivates further improvements

## 🤝 Contributing

PRs welcome. Ideas welcome. Improvements welcome.

## 🔐 Security

* Dependabot enabled
* CodeQL scanning
* Secure workflows

## 📜 License

MIT

<p align="center">
  <b>Stop managing releases. Start shipping them 🚀</b>
</p>
