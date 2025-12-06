# GitHub Pages 部署脚本 (PowerShell)
# 使用说明：
# 在PowerShell中运行：.\deploy.ps1
# 根据提示输入GitHub用户名和密码/Token

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Pages 部署脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查git是否已安装
try {
    git --version | Out-Null
} catch {
    Write-Host "错误：未找到Git，请先安装Git for Windows" -ForegroundColor Red
    Write-Host "下载地址：https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host "准备推送到GitHub..." -ForegroundColor Green
Write-Host ""

# 显示当前状态
Write-Host "当前分支状态：" -ForegroundColor Yellow
git status --short
Write-Host ""

# 检查是否有未提交的更改
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "发现未提交的更改，正在提交..." -ForegroundColor Yellow
    git add .
    git commit -m "Update deployment"
}

# 推送到GitHub
Write-Host "正在推送到GitHub（请在提示时输入用户名和密码/Token）..." -ForegroundColor Yellow
Write-Host ""

git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ 推送成功！" -ForegroundColor Green
    Write-Host ""
    Write-Host "GitHub Pages 部署中..." -ForegroundColor Cyan
    Write-Host "请在几分钟后访问：https://neross666.github.io/AppTools/" -ForegroundColor Green
    Write-Host ""
    Write-Host "查看部署状态：https://github.com/neross666/AppTools/actions" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ 推送失败！" -ForegroundColor Red
    Write-Host ""
    Write-Host "如果收到权限错误，请尝试以下方法：" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. 使用Personal Access Token而不是密码" -ForegroundColor Cyan
    Write-Host "   - 访问：https://github.com/settings/tokens" -ForegroundColor Gray
    Write-Host "   - 创建新Token，勾选 repo 和 workflow" -ForegroundColor Gray
    Write-Host "   - 复制Token并在提示时粘贴" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. 检查SSH密钥配置" -ForegroundColor Cyan
    Write-Host "   - 访问：https://github.com/settings/keys" -ForegroundColor Gray
    Write-Host "   - 确保已添加您的SSH公钥" -ForegroundColor Gray
    Write-Host ""
}

Read-Host "按Enter键继续"
