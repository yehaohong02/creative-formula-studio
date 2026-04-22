@echo off
chcp 65001 >nul
echo =========================================
echo   创意公式工坊 - 桌面版打包脚本
echo =========================================
echo.

echo [1/5] 检查 Node.js 环境...
node --version
if errorlevel 1 (
    echo 错误: 未找到 Node.js，请先安装 Node.js 18+
    pause
    exit /b 1
)

echo.
echo [2/5] 合并 Electron 配置...
node merge-config.js
if errorlevel 1 (
    echo 警告: 合并配置失败，尝试继续...
)

echo.
echo [3/5] 安装依赖...
npm install
if errorlevel 1 (
    echo 错误: 安装依赖失败
    pause
    exit /b 1
)

echo.
echo [4/5] 构建 Next.js 应用...
npm run build
if errorlevel 1 (
    echo 错误: 构建失败
    pause
    exit /b 1
)

echo.
echo [5/5] 打包 Electron 应用...
npm run dist:win
if errorlevel 1 (
    echo 错误: 打包失败
    pause
    exit /b 1
)

echo.
echo =========================================
echo   打包成功!
echo =========================================
echo.
echo 安装包位置: release\
echo.
echo 包含文件:
dir /b release\*.exe 2>nul
echo.
pause
