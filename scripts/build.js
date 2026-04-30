const fs = require('fs');
const path = require('path');

// 定义需要复制的文件和目录
const filesToCopy = [
  'index.html',
  'README.md',
  'LICENSE'
];

const dirsToCopy = [
  'mediapipe'
];

// 目标目录
const distDir = path.join(__dirname, '..', 'dist');

// 清理并创建 dist 目录
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

console.log('📦 开始构建部署文件...');

// 复制文件
filesToCopy.forEach(file => {
  const srcPath = path.join(__dirname, '..', file);
  const destPath = path.join(distDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ 已复制: ${file}`);
  } else {
    console.warn(`⚠️  文件不存在: ${file}`);
  }
});

// 复制目录
dirsToCopy.forEach(dir => {
  const srcPath = path.join(__dirname, '..', dir);
  const destPath = path.join(distDir, dir);
  
  if (fs.existsSync(srcPath)) {
    copyDirRecursive(srcPath, destPath);
    console.log(`✅ 已复制目录: ${dir}`);
  } else {
    console.warn(`⚠️  目录不存在: ${dir}`);
  }
});

console.log('✨ 构建完成！文件已复制到 dist 目录');
console.log(`📁 部署目录: ${distDir}`);

// 递归复制目录的辅助函数
function copyDirRecursive(src, dest) {
  // 创建目标目录
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  // 读取源目录内容
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  entries.forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      // 递归复制子目录
      copyDirRecursive(srcPath, destPath);
    } else {
      // 复制文件
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
