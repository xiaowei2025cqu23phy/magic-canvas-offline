# 🚀 快速部署指南（分支方式）

## 一键部署命令

```bash
# 1. 推送到 GitHub（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/magic-canvas-offline.git
git push -u origin main

# 2. 安装依赖并部署到 gh-pages 分支
npm install
npm run deploy

# 3. 在 GitHub Settings 中启用 Pages（选择 gh-pages 分支）

# 4. 访问你的网站
# https://你的用户名.github.io/magic-canvas-offline/
```

## 📋 已创建的文件

### ✅ 核心配置文件

| 文件 | 用途 |
|------|------|
| `package.json` | 项目配置和部署脚本（使用 gh-pages） |
| `.gitignore` | Git 忽略规则 |

### 📚 文档文件

| 文件 | 内容 |
|------|------|
| `README.md` | 项目介绍和使用说明 |
| `DEPLOYMENT.md` | 详细部署步骤（分支方式） |
| `CHECKLIST.md` | 部署前检查清单 |
| `QUICK_START.md` | 快速参考指南 |

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

### 3️⃣ 部署到 gh-pages 分支

```bash
npm install
npm run deploy
```

这会自动：
- 创建 `gh-pages` 分支
- 推送所有静态文件
- 保持 `main` 分支的源代码不变

### 4️⃣ 启用 GitHub Pages

1. 访问你的仓库
2. 点击 **Settings** → **Pages**
3. Source 选择 **Deploy from a branch**
4. Branch 选择 **gh-pages**
5. Folder 选择 **/ (root)**
6. 点击 **Save**

### 5️⃣ 测试访问

打开浏览器访问：
```
https://你的用户名.github.io/magic-canvas-offline/
```

等待 1-2 分钟让 DNS 生效。

## 💡 常用命令

```bash
# 本地开发测试
npm start

# 查看 Git 状态
git status

# 提交更改到 main 分支
git add .
git commit -m "描述你的更改"
git push

# 部署到 gh-pages 分支
npm run deploy

# 查看分支
git branch -a
```

## ⚡ 部署流程

```
修改代码
   ↓
提交到 main 分支 (git push)
   ↓
运行 npm run deploy
   ↓
自动推送到 gh-pages 分支
   ↓
GitHub Pages 自动更新
   ↓
可访问你的网站 ✨
```

## 🔄 更新部署

每次修改后的完整流程：

```bash
# 1. 提交源代码
git add .
git commit -m "更新了功能"
git push

# 2. 部署到 Pages
npm run deploy

# 3. 等待 1-2 分钟后刷新网站
```

## 🆘 遇到问题？

### gh-pages 分支没有创建？
```bash
# 手动检查
git branch -a

# 重新部署
npm run deploy
```

### 页面显示 404？
1. 确认 Settings → Pages 中选择了 `gh-pages` 分支
2. 等待 1-2 分钟
3. 清除浏览器缓存（Ctrl+F5）

### 更新后看不到变化？
```bash
# 重新部署
npm run deploy

# 强制刷新浏览器
# Ctrl + F5 (Windows)
# Cmd + Shift + R (Mac)
```

### 查看详细日志
```bash
# 查看 gh-pages 分支历史
git log gh-pages --oneline -5

# 查看部署的文件
git show gh-pages:package.json
```

---

**就这么简单！** 🎉

分支部署方式稳定可靠，适合静态网站托管。
