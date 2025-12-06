# GitHub Pages 部署指南

## 快速部署步骤

### 方法1：使用GitHub Web界面（推荐，最简单）

1. **打开GitHub仓库设置**
   - 访问：https://github.com/neross666/AppTools
   - 点击 "Settings" 选项卡

2. **启用GitHub Pages**
   - 在左侧菜单找到 "Pages"
   - 在 "Source" 部分，选择 "Deploy from a branch"
   - 选择分支：`main`
   - 选择文件夹：`/ (root)`
   - 点击 "Save"

3. **等待部署完成**
   - 刷新页面，您会看到 "Your site is live at:" 的提示
   - 通常在1-2分钟内完成

4. **访问您的游戏**
   - 您的游戏将部署在：https://neross666.github.io/AppTools/
   - 游戏主页：https://neross666.github.io/AppTools/index.html
   - 直接玩游戏：https://neross666.github.io/AppTools/tetris_game.html

---

### 方法2：通过命令行推送（需要SSH密钥配置）

```powershell
# 1. 确保所有文件已提交
git status

# 2. 推送到GitHub
git push origin main

# 3. GitHub会自动运行工作流部署
```

查看部署状态：
- 访问 https://github.com/neross666/AppTools/actions
- 查看最新的 "Deploy to GitHub Pages" 工作流运行状态

---

### 方法3：使用Token推送（如果SSH不可用）

```powershell
# 配置Git使用HTTPS
git remote set-url origin https://github.com/neross666/AppTools.git

# 推送时会提示输入用户名和密码/Token
git push origin main
```

输入用户名时：输入您的GitHub用户名  
输入密码时：输入您的Personal Access Token (PAT)

如何获取Token：
1. GitHub Settings → Developer settings → Personal access tokens
2. 创建新Token，勾选 `repo` 和 `workflow` 权限
3. 复制Token并在推送时粘贴

---

## 部署完成后

✅ **已部署的内容：**
- `index.html` - 项目首页和游戏导航
- `tetris_game.html` - 完整的俄罗斯方块游戏
- `README.md` - 项目文档
- `.gitignore` - Git配置

✅ **游戏功能：**
- 完全可玩的俄罗斯方块游戏
- 键盘控制
- 分数和等级追踪
- 无需安装，直接在浏览器中运行

---

## 常见问题

**Q: 部署后页面显示404？**  
A: 请检查：
- GitHub Pages是否已启用（Settings → Pages）
- 分支是否正确选择为 `main`
- 文件夹是否选择为 `/ (root)`

**Q: 游戏打开后显示空白或错误？**  
A: 
- 等待页面完全加载（30秒内应该看到游戏）
- 检查浏览器控制台是否有错误（F12）
- 尝试使用Chrome、Firefox或Edge浏览器

**Q: 如何更新已部署的游戏？**  
A: 
1. 修改本地文件
2. 使用 `git add .` 和 `git commit -m "更新描述"`
3. 使用 `git push origin main` 推送
4. 等待GitHub Actions自动重新部署（1-2分钟）

**Q: 如何自定义游戏URL？**  
A: 
- 在仓库Settings → Pages中设置自定义域名
- 需要拥有自己的域名并配置DNS记录

---

## 部署状态检查

查看部署是否成功：
- 工作流状态：https://github.com/neross666/AppTools/actions
- Pages设置：https://github.com/neross666/AppTools/settings/pages

有绿色✅表示部署成功，红色❌表示有错误。

---

**需要帮助？** 
如果部署遇到问题，请检查GitHub仓库的Actions标签查看错误日志。
