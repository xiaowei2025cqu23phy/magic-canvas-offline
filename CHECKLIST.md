# 部署前检查清单 ✅

在推送到 GitHub 之前，请完成以下检查：

## 📝 代码检查

- [ ] 本地测试通过（`npm start`）
- [ ] 摄像头功能正常工作
- [ ] 手势识别准确
- [ ] 所有按钮功能正常
- [ ] 控制台无错误信息

## 🔧 配置检查

- [ ] `package.json` 中的仓库 URL 已更新为你的 GitHub 用户名
- [ ] `.github/workflows/deploy.yml` 存在且配置正确
- [ ] `.gitignore` 已排除 `node_modules/` 和其他不需要提交的文件
- [ ] `README.md` 包含项目说明
- [ ] `index.html` 中包含 `<base href="./">` 标签

## 📦 文件检查

运行以下命令确认文件结构：

```bash
# 查看将要提交的文件
git status

# 应该看到以下文件：
# - .github/workflows/deploy.yml
# - .gitignore
# - README.md
# - DEPLOYMENT.md
# - index.html
# - package.json
# - package-lock.json
# - mediapipe/ (目录)
```

## 🚀 部署步骤

### 1. 初始化 Git（如果还没有）

```bash
git init
git add .
git commit -m "Initial commit: Magic Canvas Offline with GitHub Pages deployment"
```

### 2. 创建 GitHub 仓库

访问 https://github.com/new 创建新仓库

### 3. 推送代码

```bash
# 替换为你的实际仓库地址
git remote add origin https://github.com/你的用户名/magic-canvas-offline.git
git branch -M main
git push -u origin main
```

### 4. 启用 GitHub Pages

1. 进入仓库的 **Settings** → **Pages**
2. Source 选择 **GitHub Actions**
3. 等待自动部署完成（查看 Actions 标签页）

### 5. 验证部署

访问：`https://你的用户名.github.io/magic-canvas-offline/`

## ⚠️ 注意事项

1. **必须使用 HTTP 服务器**：不要直接双击打开 `index.html`，MediaPipe 需要通过 HTTP/HTTPS 加载 WASM 文件
2. **摄像头权限**：GitHub Pages 使用 HTTPS，浏览器会要求用户授权摄像头
3. **首次部署时间**：可能需要 2-5 分钟
4. **缓存问题**：如果更新后看不到变化，清除浏览器缓存或使用 Ctrl+F5 强制刷新

## 🔍 故障排查

### GitHub Actions 失败？

1. 进入 **Actions** 标签页
2. 点击失败的运行
3. 查看详细错误日志
4. 常见问题：
   - Node.js 版本不兼容 → 检查 `deploy.yml` 中的 node-version
   - 权限不足 → 检查仓库 Settings → Actions 设置

### 页面空白？

1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签页的错误信息
3. 查看 Network 标签页，确认所有文件都成功加载
4. 特别检查 `mediapipe/` 目录下的文件是否 404

### 摄像头无法访问？

1. 确认使用的是 HTTPS（GitHub Pages 默认提供）
2. 检查浏览器地址栏是否有摄像头图标
3. 点击图标确认权限已授予
4. 尝试使用 Chrome 或 Edge 浏览器

## 📊 部署成功后

分享你的作品：

```
🎨 我的魔法画板应用：
https://你的用户名.github.io/magic-canvas-offline/

✨ 用手势绘画，捏合触发特效！
```

## 🔄 后续更新

每次修改后：

```bash
git add .
git commit -m "描述你的更改"
git push
# GitHub Actions 会自动重新部署
```

---

**祝部署顺利！** 🎉
