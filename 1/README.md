# 🎮 俄罗斯方块游戏 - Web 版本

一个使用 HTML5 Canvas 和 JavaScript 开发的俄罗斯方块游戏。

## 📁 项目结构

```
tetris-game-web/
├── index.html              # 项目导航页面
├── tetris_game.html        # 游戏主文件（双击打开即玩！）
├── README.md               # 项目说明
└── .gitignore              # Git 配置
```

## 🎮 游戏特性

- ✅ 完整的俄罗斯方块游戏玩法
- ✅ 7 种标准方块类型
- ✅ 流畅的旋转和移动
- ✅ 精准的碰撞检测
- ✅ 行清除和得分系统
- ✅ 难度递增机制
- ✅ 暂停和重新开始功能
- ✅ 下一个方块预览
- ✅ 响应式 UI 设计

## 🚀 快速开始

### 方式 1：直接打开游戏（推荐）
```
双击打开：tetris_game.html
在浏览器中立即玩游戏！
```

### 方式 2：通过导航页面
```
双击打开：index.html
查看项目导航和说明
```

### 方式 3：本地服务器
```powershell
# 如果已安装 Python
python -m http.server 8000

# 然后在浏览器访问
# http://localhost:8000/tetris_game.html
```

## 🎮 游戏控制

| 按键 | 功能 |
|------|------|
| `←` `→` | 左右移动方块 |
| `↑` | 旋转方块 |
| `↓` | 加速下降 |
| `空格` | 快速下落 |
| `P` | 暂停/继续 |

## 💻 系统要求

- 现代 Web 浏览器（Chrome、Firefox、Edge、Safari）
- HTML5 支持
- JavaScript 启用
- 无需安装任何软件

## 📊 游戏说明

### 游戏规则
1. 方块从顶部随机生成并落下
2. 玩家可以控制方块的位置和旋转
3. 当一行完全填满时，该行消除并获得分数
4. 当新方块无法放置时游戏结束

### 得分系统
- 单行消除：100 分
- 难度系统：每消除 10 行，难度增加 1 级，下落速度加快

### 方块类型
```
I型  O型  T型  S型  Z型  J型  L型
```

## 🎨 代码特色

- 清晰的代码结构
- 详细的中文注释
- 易于理解和修改
- 模块化设计

### 主要类和函数

**TetrisPiece 类**
- `getBlocks()` - 获取方块坐标
- `rotate()` - 旋转方块

**游戏核心函数**
- `update()` - 更新游戏状态
- `draw()` - 绘制游戏画面
- `gameLoop()` - 主游戏循环
- `isValidPosition()` - 验证位置有效性
- `clearRows()` - 清除完整行

## 🌐 分享和部署

### GitHub Pages（推荐）
1. 创建 GitHub 仓库
2. 上传 tetris_game.html 和 index.html
3. 启用 GitHub Pages
4. 获得可分享的公网链接

### 其他部署方式
- Netlify（免费）
- Vercel（免费）
- Firebase Hosting（免费额度）

## 🔧 自定义修改

编辑 `tetris_game.html` 中的以下变量可自定义游戏：

```javascript
// 调整游戏难度
let fallSpeed = 0.5;        // 越小越快

// 调整网格大小
const GRID_WIDTH = 10;      // 列数
const GRID_HEIGHT = 20;     // 行数

// 修改方块颜色
const COLORS = {
    I: '#00ffff',    // 青色
    O: '#ffff00',    // 黄色
    // ... 更多颜色
};
```

## 📈 进阶建议

- 🎵 添加音效（Web Audio API）
- 💾 保存最高分（LocalStorage）
- 🎨 添加动画效果
- 📊 在线排行榜
- � 移动设备优化

## 📄 许可证

MIT License - 可自由使用和分享

## 🙋 需要帮助？

- 查看源代码中的注释
- 浏览器 F12 打开开发工具
- 检查浏览器控制台的错误信息

---

**祝你游戏愉快！** 🎮✨
