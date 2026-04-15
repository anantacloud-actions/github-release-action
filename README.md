# 🚀 GitHub Release Action

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/1b6b7b7a-a22c-42d2-a2ee-2b88b0953c55" />

Automate GitHub Releases directly from your CI/CD pipeline.

![Build](https://img.shields.io/github/actions/workflow/status/anantacloud-actions/github-release-action/release.yml?branch=main&style=for-the-badge&label=Build)
 ![Version](https://img.shields.io/github/v/release/anantacloud-actions/github-release-action?style=for-the-badge&label=Latest) ![License](https://img.shields.io/github/license/anantacloud-actions/github-release-action?style=for-the-badge) ![Downloads](https://img.shields.io/github/downloads/anantacloud-actions/github-release-action/total?style=for-the-badge) ![Dependabot](https://img.shields.io/badge/dependabot-enabled-blue?style=for-the-badge) ![Bundled](https://img.shields.io/badge/bundled-ncc-orange?style=for-the-badge) ![Node](https://img.shields.io/badge/node-20.x-green?style=for-the-badge)

## ✨ Features

- Create releases automatically
- Attach changelog
- Support draft & prerelease
- Simple and fast setup


## 📦 Usage

```yaml
- name: Create Release
  uses: anantacloud-actions/github-release-action@v1
  with:
    tag: v1.0.0
    name: "v1.0.0 — Smart Release"
    body: ${{ steps.changelog.outputs.changelog }}
```

## ⚙️ Inputs
| Name       | Required | Description          |
| ---------- | -------- | -------------------- |
| tag        | ✅        | Git tag              |
| name       | ✅        | Release title        |
| body       | ❌        | Release notes        |
| draft      | ❌        | Create draft release |
| prerelease | ❌        | Mark as prerelease   |

## 🔐 Security
- Uses GitHub token securely
- Works with protected branches
- Designed for CI/CD pipelines

## 🚀 Example
```
- name: Release
  uses: anantacloud-actions/github-release-action@v1
  with:
    tag: v1.2.0
    name: "v1.2.0 — Feature Update"
```

## ⭐ Support
If you like this action, give it a star ⭐
