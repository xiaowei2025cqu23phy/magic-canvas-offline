# GitHub Pages 部署指南（分支部署方式）

## 📋 前置要求

1. GitHub 账号
2. Git 已安装并配置
3. Node.js 和 npm（用于本地测试和部署）

## 🚀 部署步骤

### 第一步：初始化 Git 仓库（如果还没有）

```bash
# 进入项目目录
cd magic-canvas-offline

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交初始版本
git commit -m "Initial commit: Magic Canvas Offline"
```

### 第二步：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com)
2. 点击 **New repository**
3. 填写仓库名称（例如：`magic-canvas-offline`）
4. 选择 **Public**（GitHub Pages 免费托管需要公开仓库）
5. **不要** 初始化 README、.gitignore 或 license（我们已经有了）
6. 点击 **Create repository**

### 第三步：推送到 GitHub

```bash
# 添加远程仓库（替换为你的用户名和仓库名）
git remote add origin https://github.com/xiaowei2025cqu23phy/magic-canvas-offline.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 第四步：部署到 gh-pages 分支

```bash
# 安装依赖
npm install

# 运行部署命令（会自动创建 gh-pages 分支并推送）
npm run deploy
```

这个命令会：
- 自动创建 `gh-pages` 分支
- 将所有静态文件推送到该分支
- 保持 `main` 分支的源代码不变

### 第五步：启用 GitHub Pages

1. 进入仓库的 **Settings** → **Pages**
2. 在 **Build and deployment** 部分：
   - Source 选择 **Deploy from a branch**
   - Branch 选择 **gh-pages**
   - Folder 选择 **/ (root)**
3. 点击 **Save**
4. 等待 1-2 分钟让 DNS 生效
5. 访问生成的 URL（格式：`https://你的用户名.github.io/magic-canvas-offline/`）

### 第六步：验证部署

1. 访问你的 GitHub Pages URL
2. 允许摄像头权限
3. 测试手势识别功能

## 🔧 常见问题

### 1. gh-pages 分支没有创建

**解决方案：**
```bash
# 手动检查分支
git branch -a

# 如果 gh-pages 不存在，重新运行
npm run deploy
```

### 2. 部署后页面显示 404

**解决方案：**
- 确认仓库是 **Public**（公开）
- 检查 GitHub Pages 设置中的 Branch 是否选择了 `gh-pages`
- 等待 1-2 分钟让 DNS 生效
- 清除浏览器缓存或使用无痕模式访问
- 检查浏览器控制台是否有 404 错误

### 3. MediaPipe 资源加载失败

**原因：** GitHub Pages 的路径问题

**解决方案：**
已在 `index.html` 中添加 `<base href="./">` 标签，确保相对路径正确。

如果仍有问题，检查浏览器控制台的网络请求，确认 `mediapipe/` 目录下的文件都能正常加载。

### 4. 摄像头权限被拒绝

**注意：** GitHub Pages 必须使用 HTTPS，现代浏览器要求安全上下文才能访问摄像头。

**解决方案：**
- GitHub Pages 默认提供 HTTPS，无需额外配置
- 确保用户点击"允许"摄像头权限
- 某些浏览器可能在 localhost 以外阻止摄像头，尝试使用 Chrome/Edge

### 5. 更新后看不到变化

**解决方案：**
```bash
# 修改代码后，重新部署
git add .
git commit -m "描述你的更改"
git push

# 重新部署到 gh-pages
npm run deploy
```

然后：
- 按 `Ctrl+F5` 强制刷新浏览器
- 或清除浏览器缓存
- 或使用无痕模式测试

### 6. 自定义域名

如果想使用自定义域名：

1. 在仓库根目录创建 `CNAME` 文件，内容是你的域名：
   ```
   your-domain.com
   ```

2. 在你的域名提供商处添加 CNAME 记录：
   ```
   CNAME your-domain.com → 你的用户名.github.io
   ```

3. 在 **Settings** → **Pages** → **Custom domain** 中输入你的域名

## 📊 监控部署状态

### 查看 gh-pages 分支

```bash
# 查看所有分支
git branch -a

# 应该看到：
# * main
#   remotes/origin/gh-pages
```

### 检查部署历史

```bash
# 查看 gh-pages 分支的提交历史
git log gh-pages --oneline -5
```

### 查看文件大小

```bash
# 确保没有上传不必要的文件
du -sh mediapipe/*
```

## 💡 优化建议

### 减小 gh-pages 分支体积

`.gitignore` 已经排除了 `node_modules/`，但如果你发现分支太大：

```bash
# 查看 gh-pages 分支大小
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sed -n 's/^blob //p' | sort -rnk2 | head -n 10
```

### 清理旧的部署

如果 gh-pages 分支积累了太多历史：

```bash
# 使用 --dotfiles 参数只部署必要文件
npx gh-pages -d . --dotfiles

# 或者清理后重新部署
npx gh-pages -d . --remove "**/*"
```

### 添加版本号

在 `package.json` 中维护版本号，便于追踪：
```json
{
  "version": "1.0.0"
}
```

每次部署前更新版本号：
```bash
npm version patch  # 小更新
npm version minor  # 新功能
npm version major  # 重大变更
```

## 🔄 更新部署流程

每次修改代码后的完整流程：

```bash
# 1. 提交到 main 分支
git add .
git commit -m "描述你的更改"
git push

# 2. 部署到 gh-pages 分支
npm run deploy

# 3. 等待 1-2 分钟后访问网站
```

**自动化脚本（可选）：**

创建 `deploy.sh`（Linux/Mac）或 `deploy.bat`（Windows）：

```bash
#!/bin/bash
# deploy.sh
git add .
git commit -m "$1"
git push
npm run deploy
echo "✅ 部署完成！访问: https://你的用户名.github.io/magic-canvas-offline/"
```

使用方法：
```bash
./deploy.sh "添加了新功能"
```

## ⚠️ 重要注意事项

1. **gh-pages 分支是自动管理的**
   - 不要手动修改 gh-pages 分支
   - 每次运行 `npm run deploy` 会覆盖之前的内容
   - main 分支保留完整的开发历史

2. **部署的是构建产物**
   - gh-pages 分支只包含静态文件（HTML、CSS、JS、图片等）
   - 不包含 `.git`、`node_modules`、配置文件等

3. **首次部署时间**
   - 第一次部署可能需要 2-5 分钟
   - 后续更新通常只需 1-2 分钟

4. **摄像头权限**
   - GitHub Pages 使用 HTTPS，浏览器会要求授权
   - 用户必须点击"允许"才能使用手势识别

## 🎉 完成！

现在你的魔法画板应用已经成功部署到 GitHub Pages，可以分享给任何人使用了！

分享链接格式：
```
https://你的用户名.github.io/magic-canvas-offline/
```

---

**提示：** 分支部署方式简单可靠，适合静态网站。如果需要更复杂的构建流程，可以考虑切换到 GitHub Actions。
