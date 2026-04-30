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
- [ ] `.gitignore` 已排除 `node_modules/` 和其他不需要提交的文件
- [ ] `README.md` 包含项目说明
- [ ] `index.html` 中包含 `<base href="./">` 标签
- [ ] `npm run deploy` 命令可以正常运行

## 📦 文件检查

运行以下命令确认文件结构：

```bash
# 查看将要提交的文件
git status

# 应该看到以下文件：
# - .gitignore
# - README.md
# - DEPLOYMENT.md
# - QUICK_START.md
# - CHECKLIST.md
# - index.html
# - package.json
# - package-lock.json
# - mediapipe/ (目录)
```

**注意：** 不应该有 `.github/` 目录（我们使用分支部署，不是 GitHub Actions）

## 🚀 部署步骤

### 1. 初始化 Git（如果还没有）

```bash
git init
git add .
git commit -m "Initial commit: Magic Canvas Offline"
```

### 2. 创建 GitHub 仓库

访问 https://github.com/new 创建新仓库

### 3. 推送源代码到 main 分支

```bash
# 替换为你的实际仓库地址
git remote add origin https://github.com/你的用户名/magic-canvas-offline.git
git branch -M main
git push -u origin main
```

### 4. 部署到 gh-pages 分支

```bash
# 安装依赖
npm install

# 部署到 gh-pages 分支
npm run deploy
```

这个命令会：
- 自动创建 `gh-pages` 分支
- 将所有静态文件推送到该分支
- 保持 `main` 分支的源代码不变

### 5. 启用 GitHub Pages

1. 进入仓库的 **Settings** → **Pages**
2. Source 选择 **Deploy from a branch**
3. Branch 选择 **gh-pages**
4. Folder 选择 **/ (root)**
5. 点击 **Save**

### 6. 验证部署

访问：`https://你的用户名.github.io/magic-canvas-offline/`

等待 1-2 分钟让 DNS 生效。

## ⚠️ 注意事项

1. **必须使用 HTTP 服务器**：不要直接双击打开 `index.html`，MediaPipe 需要通过 HTTP/HTTPS 加载 WASM 文件
2. **摄像头权限**：GitHub Pages 使用 HTTPS，浏览器会要求用户授权摄像头
3. **首次部署时间**：可能需要 2-5 分钟
4. **缓存问题**：如果更新后看不到变化，清除浏览器缓存或使用 Ctrl+F5 强制刷新
5. **分支管理**：
   - `main` 分支：保存源代码和开发历史
   - `gh-pages` 分支：只包含静态文件，由 `npm run deploy` 自动管理

## 🔍 故障排查

### gh-pages 分支没有创建？

```bash
# 检查分支
git branch -a

# 如果没有 gh-pages，重新运行
npm run deploy
```

### 页面空白或 404？

1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签页的错误信息
3. 查看 Network 标签页，确认所有文件都成功加载
4. 特别检查 `mediapipe/` 目录下的文件是否 404
5. 确认 Settings → Pages 中选择了 `gh-pages` 分支

### 摄像头无法访问？

1. 确认使用的是 HTTPS（GitHub Pages 默认提供）
2. 检查浏览器地址栏是否有摄像头图标
3. 点击图标确认权限已授予
4. 尝试使用 Chrome 或 Edge 浏览器

### 部署失败？

```bash
# 查看详细错误
npm run deploy --verbose

# 常见问题：
# - 网络连接问题
# - npm 权限问题（尝试不使用 sudo）
# - gh-pages 版本过旧（npm update gh-pages）
```

### 如何清理错误的部署？

```bash
# 删除本地的 gh-pages 分支
git branch -D gh-pages

# 删除远程的 gh-pages 分支
git push origin --delete gh-pages

# 重新部署
npm run deploy
```

## 📊 部署成功后

分享你的作品：

```
🎨 我的魔法画板应用：
https://你的用户名.github.io/magic-canvas-offline/

✨ 用手势绘画，捏合触发特效！
```

## 🔄 后续更新

每次修改后的完整流程：

```bash
# 1. 提交源代码到 main
git add .
git commit -m "描述你的更改"
git push

# 2. 部署到 gh-pages
npm run deploy

# 3. 等待 1-2 分钟后访问网站
```

---

**祝部署顺利！** 🎉
