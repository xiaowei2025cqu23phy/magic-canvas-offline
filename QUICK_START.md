# 🚀 快速部署指南

## 一键部署命令

```bash
# 1. 推送到 GitHub（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/magic-canvas-offline.git
git push -u origin main

# 2. 等待 GitHub Actions 自动部署（1-2分钟）

# 3. 访问你的网站
# https://你的用户名.github.io/magic-canvas-offline/
```

## 📋 已创建的文件

### ✅ 核心配置文件

| 文件 | 用途 |
|------|------|
| `.github/workflows/deploy.yml` | GitHub Actions 自动部署配置 |
| `package.json` | 项目配置和部署脚本 |
| `.gitignore` | Git 忽略规则 |

### 📚 文档文件

| 文件 | 内容 |
|------|------|
| `README.md` | 项目介绍和使用说明 |
| `DEPLOYMENT.md` | 详细部署步骤和故障排查 |
| `CHECKLIST.md` | 部署前检查清单 |

### 🔧 应用文件

| 文件 | 说明 |
|------|------|
| `index.html` | 主应用（已添加 `<base href="./">`） |
| `mediapipe/` | MediaPipe 离线资源 |

## 🎯 下一步操作

### 1️⃣ 更新 package.json 中的仓库信息

打开 `package.json`，将以下字段替换为你的实际信息：

```json
{
  "repository": {
    "url": "https://github.com/你的用户名/magic-canvas-offline.git"
  },
  "homepage": "https://你的用户名.github.io/magic-canvas-offline/"
}
```

### 2️⃣ 推送到 GitHub

```bash
git push -u origin main
```

### 3️⃣ 启用 GitHub Pages

1. 访问你的仓库
2. 点击 **Settings** → **Pages**
3. Source 选择 **GitHub Actions**
4. 等待部署完成

### 4️⃣ 测试访问

打开浏览器访问：
```
https://你的用户名.github.io/magic-canvas-offline/
```

## 💡 常用命令

```bash
# 本地开发测试
npm start

# 查看 Git 状态
git status

# 提交更改
git add .
git commit -m "描述你的更改"
git push

# 手动部署（可选）
npm run deploy
```

## ⚡ 自动化流程

```
推送代码到 main 分支
        ↓
触发 GitHub Actions
        ↓
安装依赖并构建
        ↓
自动部署到 GitHub Pages
        ↓
可访问你的网站 ✨
```

## 🆘 遇到问题？

1. **查看 Actions 日志**：仓库 → Actions → 最近的运行
2. **阅读 DEPLOYMENT.md**：详细的故障排查指南
3. **检查 CHECKLIST.md**：确认所有配置正确

---

**就这么简单！** 🎉
