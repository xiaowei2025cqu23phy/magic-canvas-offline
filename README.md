# MediaPipe 手势识别魔法画板

一个基于 MediaPipe Hands 的手势追踪绘画应用，支持离线运行和实时手势交互。

## ✨ 功能特性
# 1. 推送源代码到 main 分支
git push -u origin main

# 2. 安装依赖并部署到 gh-pages 分支
npm install
npm run deploy

# 3. 在 GitHub Settings → Pages 中选择 gh-pages 分支

# 4. 访问 https://你的用户名.github.io/magic-canvas-offline/
- 🖐️ **实时手势追踪**：使用 MediaPipe Hands 模型检测手部关键点
- 🎨 **魔法绘画**：移动食指进行绘制，粒子效果跟随手势
- 💥 **能量爆发**：捏合拇指和食指触发爆炸粒子效果
- 🌈 **多种魔法主题**：6种预设颜色主题（冰霜凤凰、暗影荆棘、琥珀流光等）
- 🔒 **完全离线**：所有资源本地化，无需网络连接
- 🦴 **骨骼可视化**：可选择显示/隐藏手部骨骼结构

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动本地服务器（必须通过 HTTP 访问，不能直接打开文件）
npm start
```

浏览器会自动打开 `http://localhost:8080`

### 部署到 GitHub Pages

#### 方法：使用 gh-pages 分支（推荐）

1. Fork 或克隆此仓库到 GitHub
2. 推送代码到 `main` 分支：
   ```bash
   git remote add origin https://github.com/你的用户名/magic-canvas-offline.git
   git push -u origin main
   ```
3. 部署到 gh-pages 分支：
   ```bash
   npm install
   npm run deploy
   ```
4. 在仓库设置中启用 GitHub Pages：
   - 进入 **Settings** → **Pages**
   - Source 选择 **Deploy from a branch**
   - Branch 选择 **gh-pages**
   - Folder 选择 **/ (root)**
5. 等待 1-2 分钟后访问 `https://你的用户名.github.io/仓库名`

## 📖 使用说明

1. **允许摄像头权限**：首次访问时浏览器会请求摄像头权限，请点击"允许"
2. **手势操作**：
   - ✨ **绘制**：移动食指（指尖索引点 8）
   - 💥 **爆发**：捏合拇指（点 4）和食指（点 8），距离小于阈值时触发
3. **控制面板**：
   - **显示/隐藏摄像头**：切换小窗口预览
   - **显示/隐藏骨骼**：切换手部骨骼连线显示
   - **清空画板**：清除所有绘制的粒子
   - **召唤新魔法**：随机切换颜色主题

## 🛠️ 技术栈

- **MediaPipe Hands**：Google 的手部追踪机器学习模型
- **HTML5 Canvas**：高性能 2D 图形渲染
- **Vanilla JavaScript**：无框架依赖，纯原生实现
- **CSS3**：现代化 UI 样式（Tailwind CSS 类名风格）

## 📁 项目结构

```
magic-canvas-offline/
├── mediapipe/                   # MediaPipe 离线资源
│   ├── hands.js                 # 核心库
│   ├── hands_solution_*.js      # WASM 二进制文件
│   └── index.d.ts               # TypeScript 类型定义
├── .gitignore                   # Git 忽略规则
├── index.html                   # 主应用文件
├── package.json                 # 项目配置和依赖
├── README.md                    # 项目文档
├── DEPLOYMENT.md                # 详细部署指南
├── QUICK_START.md               # 快速参考
└── CHECKLIST.md                 # 部署检查清单
```

## ⚙️ 配置说明

### MediaPipe 参数

在 `index.html` 中可以调整以下参数：

```javascript
hands.setOptions({
    maxNumHands: 2,              // 最大检测手数
    modelComplexity: 1,          // 模型复杂度 (0=轻量, 1=标准)
    minDetectionConfidence: 0.6, // 最小检测置信度
    minTrackingConfidence: 0.6   // 最小跟踪置信度
});
```

### 捏合阈值

调整捏合触发的距离阈值（默认 0.05）：

```javascript
const isPinching = distance < 0.05;  // 减小数值提高灵敏度
```

## 🎨 自定义魔法主题

在 `offlineMagicThemes` 数组中添加新主题：

```javascript
{
    name: "主题名称",
    lore: "背景故事描述",
    normalH: 正常状态色相值 (0-360),
    pinchH: 捏合状态色相值 (0-360)
}
```

## 🐛 常见问题

### 摄像头无法访问

- ✅ 确保通过 `http://localhost` 访问，不要直接双击打开 HTML 文件
- ✅ 检查浏览器是否授予摄像头权限
- ✅ 确认没有其他应用占用摄像头
- ✅ 尝试使用 Chrome/Edge 浏览器（兼容性最佳）

### 手势识别不准确

- ✅ 确保光线充足，避免背光
- ✅ 手部完整出现在画面中
- ✅ 调整 `minDetectionConfidence` 参数
- ✅ 尝试 `modelComplexity: 1` 获得更好精度

### 性能优化

- 降低视频分辨率：修改 `getUserMedia` 中的 `width/height`
- 减少粒子数量：调整 `particleCount` 变量
- 使用 `modelComplexity: 0` 降低模型复杂度

### 部署问题

- 查看 [DEPLOYMENT.md](DEPLOYMENT.md) 获取详细的部署指南
- 查看 [CHECKLIST.md](CHECKLIST.md) 进行部署前检查
- 查看 [QUICK_START.md](QUICK_START.md) 获取快速参考

## 📄 许可证

MIT License

## 🙏 致谢

- [MediaPipe](https://google.github.io/mediapipe/) - Google 的跨平台机器学习框架
- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands) - 手部追踪解决方案

---

**享受你的魔法绘画之旅！** ✨🎨
