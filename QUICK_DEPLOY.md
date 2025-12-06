# 🚀 快速部署到GitHub Pages

## 最简单的方法（推荐）

### 方法1：通过GitHub Web界面（无需任何命令）

1. **打开您的仓库**
   - 访问：https://github.com/neross666/AppTools

2. **进入设置**
   - 点击 "Settings" 选项卡
   - 左侧菜单找到 "Pages"

3. **启用GitHub Pages**
   - "Source" 选择：`Deploy from a branch`
   - 选择分支：`main`
   - 选择文件夹：`/ (root)`
   - 点击 "Save"

4. **完成！**
   - 等待1-2分钟
   - 访问您的游戏：**https://neross666.github.io/AppTools/**

---

## 方法2：使用提供的脚本

### Windows 用户

**选项 A - 使用批处理脚本（最简单）**
```powershell
双击 deploy.bat
```

**选项 B - 使用PowerShell脚本**
```powershell
右键点击 deploy.ps1 → 使用PowerShell运行
# 或在PowerShell中：
.\deploy.ps1
```

### Mac/Linux 用户

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 方法3：手动推送（命令行）

```powershell
# 1. 查看当前状态
git status

# 2. 推送到GitHub
git push origin main

# 3. 输入您的GitHub用户名和Personal Access Token
#    用户名：您的GitHub用户名
#    密码：您的Personal Access Token（不是密码！）
```

---

## 如果推送失败

### 错误：Permission denied (publickey)

**解决方案1：使用HTTPS替代SSH**
```powershell
git remote set-url origin https://github.com/neross666/AppTools.git
git push origin main
```

**解决方案2：配置Personal Access Token**

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 设置：
   - Token name: `GitHub Pages Deploy`
   - Expiration: 90 days 或更长
   - Scopes: 勾选 `repo` 和 `workflow`
4. 点击 "Generate token" 并复制Token
5. 在推送时提示输入密码时，粘贴这个Token

---

## 验证部署成功

### ✅ 检查部署状态

1. **查看Actions**
   - 访问：https://github.com/neross666/AppTools/actions
   - 查找 "Deploy to GitHub Pages" 工作流
   - 看到 ✅ 绿色表示成功

2. **查看Pages设置**
   - 访问：https://github.com/neross666/AppTools/settings/pages
   - 应该看到 "Your site is live at: https://neross666.github.io/AppTools/"

3. **访问您的游戏**
   - https://neross666.github.io/AppTools/
   - https://neross666.github.io/AppTools/tetris_game.html

---

## 更新已部署的游戏

每次推送到 `main` 分支时，GitHub Pages 会自动重新部署：

```powershell
# 1. 修改文件
# 2. 提交更改
git add .
git commit -m "描述您的更改"

# 3. 推送
git push origin main

# 4. 等待部署（通常1-2分钟）
# 5. 刷新网页查看更新
```

---

## 需要帮助？

- 📖 完整指南：[DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 GitHub Actions日志：https://github.com/neross666/AppTools/actions
- 💬 GitHub Issues：https://github.com/neross666/AppTools/issues

---

**✨ 就这样！您的游戏现在已经在全球可访问了！**
