# 🚀 GitHub Release Action

Automate GitHub Releases directly from your CI/CD pipeline.


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
  uses: anantacloud-bot/github-release-action@v1
  with:
    tag: v1.2.0
    name: "v1.2.0 — Feature Update"
```

## ⭐ Support
If you like this action, give it a star ⭐
