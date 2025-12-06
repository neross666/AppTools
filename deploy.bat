@echo off
REM GitHub Pages 部署脚本 (Windows)
REM 使用说明：
REM 1. 双击此文件运行
REM 2. 根据提示输入GitHub用户名和密码/Token

setlocal enabledelayedexpansion

echo ========================================
echo GitHub Pages 部署脚本
echo ========================================
echo.

REM 检查git是否已安装
git --version >nul 2>&1
if errorlevel 1 (
    echo 错误：未找到Git，请先安装Git for Windows
    echo 下载地址：https://git-scm.com/download/win
    pause
    exit /b 1
)

echo 准备推送到GitHub...
echo.

REM 显示当前状态
echo 当前分支状态：
git status --short
echo.

REM 检查是否有未提交的更改
git diff --exit-code >nul 2>&1
if errorlevel 1 (
    echo 发现未提交的更改，正在提交...
    git add .
    git commit -m "Update deployment"
)

REM 推送到GitHub
echo 正在推送到GitHub（请在提示时输入用户名和密码/Token）...
echo.

git push origin main

if errorlevel 1 (
    echo.
    echo 推送失败！
    echo.
    echo 如果收到权限错误，请尝试以下方法：
    echo.
    echo 1. 使用Personal Access Token而不是密码
    echo    - 访问：https://github.com/settings/tokens
    echo    - 创建新Token，勾选 repo 和 workflow
    echo    - 复制Token并在提示时粘贴
    echo.
    echo 2. 检查SSH密钥配置
    echo    - 访问：https://github.com/settings/keys
    echo    - 确保已添加您的SSH公钥
    echo.
    pause
    exit /b 1
) else (
    echo.
    echo 推送成功！
    echo.
    echo GitHub Pages 部署中...
    echo 请在几分钟后访问：https://neross666.github.io/AppTools/
    echo.
    echo 查看部署状态：https://github.com/neross666/AppTools/actions
    echo.
    pause
)
