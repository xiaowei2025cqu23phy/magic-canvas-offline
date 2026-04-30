# 项目文件结构说明

## 📁 必需上传的文件（版本控制）

```
magic-canvas-offline/
├── .gitignore                          # Git 忽略规则 ✅
├── LICENSE                             # GPL-3.0 开源许可证 ✅
├── README.md                           # 项目完整文档 ✅
├── index.html                          # 主应用页面（含所有业务逻辑）✅
├── package.json                        # 项目依赖声明 ✅
└── mediapipe/                          # MediaPipe 运行时文件目录 ✅
    ├── hands.js                        # MediaPipe Hands JavaScript API (44 KB)
    ├── hands_solution_wasm_bin.js      # WASM 加载器 (270 KB)
    ├── hands_solution_wasm_bin.wasm    # WASM 模型二进制文件 (5.6 MB)
    ├── hands_solution_simd_wasm_bin.js # SIMD 优化版加载器 (270 KB)
    ├── hands_solution_simd_wasm_bin.wasm # SIMD 优化版模型 (5.7 MB)
    ├── hands_solution_packed_assets_loader.js # 资源加载器 (8 KB)
    ├── hands_solution_packed_assets.data # 打包资源数据 (4.1 MB)
    ├── hand_landmark_full.tflite       # 完整版关键点检测模型 (5.2 MB)
    ├── hand_landmark_lite.tflite       # 轻量版关键点检测模型 (2.0 MB)
    ├── hands.binarypb                  # 二进制协议配置 (0.5 KB)
    ├── index.d.ts                      # TypeScript 类型定义 (4 KB)
    └── package.json                    # MediaPipe 包元数据 (0.6 KB)
```

**总大小**：约 24 MB（主要是 MediaPipe 模型文件）

---

## ❌ 不应上传的文件（已添加到 .gitignore）

### 1. Node.js 依赖
- `node_modules/` - npm 安装的依赖包（约 100+ MB）
  - **原因**：可以通过 `npm install` 重新安装
  - **处理**：已添加到 `.gitignore`

- `package-lock.json` - npm 依赖锁定文件
  - **原因**：本项目仅使用本地 `mediapipe/` 文件，不依赖 node_modules
  - **处理**：已添加到 `.gitignore`

### 2. 操作系统文件
- `.DS_Store` (macOS)
- `Thumbs.db` (Windows)
- `desktop.ini` (Windows)
  - **原因**：系统生成的临时文件，与项目无关
  - **处理**：已添加到 `.gitignore`

### 3. 编辑器配置
- `.vscode/` - VS Code 工作区配置
- `.idea/` - JetBrains IDE 配置
- `*.swp`, `*.swo` - Vim 临时文件
  - **原因**：个人开发环境配置，不应共享
  - **处理**：已添加到 `.gitignore`

### 4. 临时文件
- `*.tmp`, `*.temp` - 临时文件
- `.cache/` - 缓存目录
- `logs/`, `*.log` - 日志文件
  - **原因**：运行时生成，不需要版本控制
  - **处理**：已添加到 `.gitignore`

---

## 🗑️ 已删除的文件

### mediapipe/README.md
- **原内容**：MediaPipe 官方的简短说明
- **删除原因**：
  1. 这是第三方库的说明，不是本项目的文档
  2. 已在主 README.md 中详细说明了 MediaPipe 的使用和版权
  3. 避免混淆，保持项目文档的统一性

---

## 📊 文件大小分析

| 类别 | 文件数量 | 总大小 | 说明 |
|------|---------|--------|------|
| **项目代码** | 1 | 19.7 KB | index.html（包含所有逻辑） |
| **文档** | 2 | 50 KB | README.md + LICENSE |
| **MediaPipe 模型** | 13 | ~24 MB | WASM + TFLite 模型文件 |
| **配置文件** | 2 | 1 KB | package.json + .gitignore |
| **总计** | 18 | ~24 MB | 适合 Git 仓库托管 |

---

## 🔍 MediaPipe 模型文件详解

### 核心推理引擎
1. **hands.js** (44 KB)
   - MediaPipe Hands 的 JavaScript API
   - 提供 `Hands` 类和 `setOptions()`, `onResults()`, `send()` 等方法

2. **hands.binarypb** (0.5 KB)
   - Protocol Buffer 二进制配置文件
   - 定义模型的计算图结构

### WebAssembly 模型（二选一）
3. **hands_solution_wasm_bin.wasm** (5.6 MB)
   - 标准 WebAssembly 模型
   - 兼容性最好，所有支持 WASM 的浏览器都能运行

4. **hands_solution_simd_wasm_bin.wasm** (5.7 MB)
   - SIMD 优化版 WebAssembly 模型
   - 性能提升 30-50%，需要浏览器支持 SIMD（Chrome 88+, Firefox 89+）

**对应的加载器**：
- `hands_solution_wasm_bin.js` / `hands_solution_simd_wasm_bin.js` (各 270 KB)
- 负责异步加载和初始化 WASM 二进制文件

### 资源打包方案
5. **hands_solution_packed_assets.data** (4.1 MB)
   - 打包的资源数据文件
   - 包含模型权重、配置等

6. **hands_solution_packed_assets_loader.js** (8 KB)
   - 资源加载器
   - 动态加载 `.data` 文件

### TensorFlow Lite 模型
7. **hand_landmark_full.tflite** (5.2 MB)
   - 完整版手部关键点检测模型
   - 精度更高，对应 `modelComplexity: 1` 或 `2`

8. **hand_landmark_lite.tflite** (2.0 MB)
   - 轻量版手部关键点检测模型
   - 速度更快，对应 `modelComplexity: 0`

### 类型定义
9. **index.d.ts** (4 KB)
   - TypeScript 类型定义文件
   - 为使用 TypeScript 的开发者提供智能提示

10. **package.json** (0.6 KB)
    - MediaPipe 包的元数据
    - 包含版本号、许可证信息等

---

## ⚙️ 如何获取 MediaPipe 模型文件

如果你需要更新或重新获取 MediaPipe 模型文件：

### 方法一：从 npm 包提取（推荐）
```bash
# 1. 安装官方包
npm install @mediapipe/hands

# 2. 复制文件到 mediapipe/ 目录
cp node_modules/@mediapipe/hands/* mediapipe/

# 3. 清理不需要的文件
rm mediapipe/README.md
```

### 方法二：从 CDN 下载
访问以下 URL 手动下载：
- https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js
- https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands_solution_wasm_bin.wasm
- ...（其他文件类似）

### 方法三：使用本项目现有文件
直接复制 `mediapipe/` 目录即可，无需重新下载。

---

## 📝 部署建议

### GitHub 仓库
```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Magic Canvas Offline with GPL-3.0 license"

# 推送到 GitHub
git remote add origin https://github.com/your-username/magic-canvas-offline.git
git push -u origin main
```

**注意**：由于包含 ~24 MB 的模型文件，首次推送可能需要几分钟。

### 静态网站托管
部署到以下平台时，只需上传根目录所有文件：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- 任何支持静态文件的 Web 服务器

**无需**：
- ❌ 安装 Node.js
- ❌ 运行 `npm install`
- ❌ 构建步骤

---

## 🔐 许可证合规检查清单

在分发本项目时，请确保：

- [x] 包含完整的 GPL-3.0 许可证文本（LICENSE 文件）
- [x] 保留所有版权声明（README 中的第三方声明）
- [x] 提供完整的源代码（包括 MediaPipe 模型文件）
- [x] 标注对 MediaPipe 的使用和感谢
- [x] 说明衍生作品必须继续使用 GPL-3.0

---

## 💡 常见问题

### Q1: 为什么要把这么大的模型文件放到 Git 仓库？
**A**: 为了实现真正的"离线可用"。用户克隆仓库后无需联网下载模型，开箱即用。

### Q2: 可以用 Git LFS 管理大文件吗？
**A**: 可以，但对于 24 MB 的项目来说不是必需的。如果未来模型文件增长到 100 MB+，可以考虑 Git LFS。

### Q3: node_modules 为什么不上传？
**A**: 
1. 体积过大（100+ MB）
2. 可以通过 `npm install` 重新生成
3. 本项目实际运行时不使用 node_modules，只用本地 `mediapipe/` 文件

### Q4: package-lock.json 为什么不上传？
**A**: 本项目仅在开发时使用 npm 获取模型文件，实际部署不依赖它。锁定文件对不同开发者可能不同，无需统一。

---

<p align="center">
  <strong>📦 本项目遵循"最小化上传"原则，只包含运行所必需的文件</strong>
</p>
