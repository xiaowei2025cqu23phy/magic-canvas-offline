# GitHub Pages 部署指南

## 📋 前置要求

1. GitHub 账号
2. Git 已安装并配置
3. Node.js 和 npm（用于本地测试）

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
git remote add origin https://github.com/你的用户名/magic-canvas-offline.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 第四步：启用 GitHub Pages

#### 方法 A：使用 GitHub Actions（推荐，自动部署）

1. 推送代码后，GitHub Actions 会自动运行
2. 进入仓库的 **Actions** 标签页查看部署进度
3. 首次部署需要手动启用 Pages：
   - 进入 **Settings** → **Pages**
   - 在 **Build and deployment** 部分
   - Source 选择 **GitHub Actions**
4. 等待部署完成（通常 1-2 分钟）
5. 访问生成的 URL（格式：`https://你的用户名.github.io/magic-canvas-offline/`）

#### 方法 B：手动部署（使用 gh-pages）

```bash
# 安装依赖
npm install

# 运行部署脚本
npm run deploy
```

这会自动创建 `gh-pages` 分支并推送。

然后在 GitHub 设置中：
1. 进入 **Settings** → **Pages**
2. Source 选择 **Deploy from a branch**
3. Branch 选择 `gh-pages`
4. Folder 选择 `/ (root)`
5. 点击 **Save**

### 第五步：验证部署

1. 访问你的 GitHub Pages URL
2. 允许摄像头权限
3. 测试手势识别功能

## 🔧 常见问题

### 1. GitHub Actions 没有自动运行

**解决方案：**
- 检查 `.github/workflows/deploy.yml` 是否存在
- 确认推送到的是 `main` 或 `master` 分支
- 进入 **Settings** → **Actions** → **General**
- 确保选择了 **Allow all actions and reusable workflows**

### 2. 部署后页面显示 404

**解决方案：**
- 确认仓库是 **Public**（公开）
- 检查 GitHub Pages 设置中的 Source 配置
- 等待 1-2 分钟让 DNS 生效
- 清除浏览器缓存或使用无痕模式访问

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

### 5. 自定义域名

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

### 查看构建日志

1. 进入仓库的 **Actions** 标签页
2. 点击最近的工作流运行
3. 查看 `build` 和 `deploy` 任务的详细日志

### 检查部署状态

```bash
# 查看当前分支
git branch

# 查看远程仓库
git remote -v

# 查看最近的提交
git log --oneline -5
```

## 🔄 更新部署

每次推送到 `main` 分支时，GitHub Actions 会自动重新部署：

```bash
# 修改代码后
git add .
git commit -m "描述你的更改"
git push
```

自动部署流程：
1. 触发 GitHub Actions
2. 安装依赖
3. 上传静态文件到 Pages
4. 自动发布到 `https://你的用户名.github.io/magic-canvas-offline/`

## 💡 优化建议

### 减小仓库体积

MediaPipe 的 WASM 文件较大，但 GitHub Pages 有 1GB 的限制，通常足够。

如果需要优化：
```bash
# 查看文件大小
du -sh mediapipe/*

# 如果太大，考虑使用 CDN（但这会失去离线能力）
```

### 添加版本号

在 `package.json` 中维护版本号，便于追踪：
```json
{
  "version": "1.0.0"
}
```

### 添加 CHANGELOG

创建 `CHANGELOG.md` 记录版本更新历史。

## 🎉 完成！

现在你的魔法画板应用已经成功部署到 GitHub Pages，可以分享给任何人使用了！

分享链接格式：
```
https://你的用户名.github.io/magic-canvas-offline/
```

---

**提示：** 首次部署可能需要几分钟时间，请耐心等待。如果遇到任何问题，请检查 GitHub Actions 的日志获取详细错误信息。
