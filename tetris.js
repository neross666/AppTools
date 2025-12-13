// 游戏配置
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 20;
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];

// 俄罗斯方块的七种形状
const SHAPES = {
    I: [[1, 1, 1, 1]],
    O: [[1, 1], [1, 1]],
    T: [[0, 1, 0], [1, 1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]],
    J: [[1, 0, 0], [1, 1, 1]],
    L: [[0, 0, 1], [1, 1, 1]]
};

const SHAPE_NAMES = Object.keys(SHAPES);

// 游戏状态
const GameState = {
    IDLE: 'idle',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
};

class TetrisGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = document.getElementById('nextCanvas');
        this.nextCtx = this.nextCanvas.getContext('2d');

        this.grid = [];
        this.currentPiece = null;
        this.nextPiece = null;
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.gameState = GameState.IDLE;
        this.gameSpeed = 500; // 毫秒
        this.gameLoopId = null;
        this.lastFallTime = 0;

        this.init();
        this.setupEventListeners();
    }

    init() {
        // 初始化网格
        this.grid = [];
        for (let i = 0; i < ROWS; i++) {
            this.grid[i] = [];
            for (let j = 0; j < COLS; j++) {
                this.grid[i][j] = 0;
            }
        }

        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.gameSpeed = 500;
        this.gameState = GameState.IDLE;
        this.updateUI();
        this.nextPiece = this.generatePiece();
        this.draw();
    }

    setupEventListeners() {
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (this.gameState !== GameState.PLAYING) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.movePiece(-1, 0);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.movePiece(1, 0);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.movePiece(0, 1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.rotatePiece();
                    break;
                case ' ':
                    e.preventDefault();
                    this.hardDrop();
                    break;
            }
        });

        // 按钮事件
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());

        // 触屏控制事件
        document.getElementById('leftBtn').addEventListener('click', () => this.movePiece(-1, 0));
        document.getElementById('rightBtn').addEventListener('click', () => this.movePiece(1, 0));
        document.getElementById('downBtn').addEventListener('click', () => this.movePiece(0, 1));
        document.getElementById('rotateBtn').addEventListener('click', () => this.rotatePiece());
        document.getElementById('dropBtn').addEventListener('click', () => this.hardDrop());

        // 禁用长按菜单
        document.querySelectorAll('.touch-btn').forEach(btn => {
            btn.addEventListener('touchstart', (e) => e.preventDefault());
        });
    }

    generatePiece() {
        const shapeName = SHAPE_NAMES[Math.floor(Math.random() * SHAPE_NAMES.length)];
        const shape = SHAPES[shapeName];
        const colorIndex = SHAPE_NAMES.indexOf(shapeName);

        return {
            shape: shape,
            x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
            y: 0,
            color: COLORS[colorIndex % COLORS.length],
            rotationIndex: 0
        };
    }

    rotatePiece() {
        if (!this.currentPiece) return;

        const originalShape = this.currentPiece.shape;
        const rotated = this.rotateMatrix(originalShape);

        // 检查旋转是否可行
        if (this.isValidPosition(rotated, this.currentPiece.x, this.currentPiece.y)) {
            this.currentPiece.shape = rotated;
        } else {
            // 尝试墙踢 (Wall Kick)
            for (let offset = 1; offset <= 2; offset++) {
                if (this.isValidPosition(rotated, this.currentPiece.x - offset, this.currentPiece.y)) {
                    this.currentPiece.shape = rotated;
                    this.currentPiece.x -= offset;
                    return;
                }
                if (this.isValidPosition(rotated, this.currentPiece.x + offset, this.currentPiece.y)) {
                    this.currentPiece.shape = rotated;
                    this.currentPiece.x += offset;
                    return;
                }
            }
        }

        this.draw();
    }

    rotateMatrix(matrix) {
        const n = matrix.length;
        const m = matrix[0].length;
        const rotated = [];

        for (let i = 0; i < m; i++) {
            rotated[i] = [];
            for (let j = n - 1; j >= 0; j--) {
                rotated[i][n - 1 - j] = matrix[j][i];
            }
        }

        return rotated;
    }

    movePiece(dx, dy) {
        if (!this.currentPiece) return;

        const newX = this.currentPiece.x + dx;
        const newY = this.currentPiece.y + dy;

        if (this.isValidPosition(this.currentPiece.shape, newX, newY)) {
            this.currentPiece.x = newX;
            this.currentPiece.y = newY;
            this.draw();
            return true;
        }

        return false;
    }

    hardDrop() {
        if (!this.currentPiece) return;

        while (this.movePiece(0, 1)) {}
        this.lockPiece();
    }

    isValidPosition(shape, x, y) {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] === 0) continue;

                const gridX = x + col;
                const gridY = y + row;

                if (gridX < 0 || gridX >= COLS || gridY >= ROWS) {
                    return false;
                }

                if (gridY >= 0 && this.grid[gridY][gridX] !== 0) {
                    return false;
                }
            }
        }

        return true;
    }

    lockPiece() {
        if (!this.currentPiece) return;

        // 将方块添加到网格
        for (let row = 0; row < this.currentPiece.shape.length; row++) {
            for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
                if (this.currentPiece.shape[row][col] === 0) continue;

                const gridX = this.currentPiece.x + col;
                const gridY = this.currentPiece.y + row;

                if (gridY < 0) {
                    // 游戏结束
                    this.endGame();
                    return;
                }

                this.grid[gridY][gridX] = this.currentPiece.color;
            }
        }

        // 检查并消除完整的行
        this.checkLines();

        // 生成新方块
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.generatePiece();

        this.draw();
    }

    checkLines() {
        const linesToClear = [];

        for (let row = ROWS - 1; row >= 0; row--) {
            if (this.grid[row].every(cell => cell !== 0)) {
                linesToClear.push(row);
            }
        }

        if (linesToClear.length === 0) return;

        // 移除完整行
        linesToClear.forEach(row => {
            this.grid.splice(row, 1);
            this.grid.unshift(new Array(COLS).fill(0));
        });

        // 计算分数
        const baseScore = linesToClear.length;
        const multiplier = [40, 100, 300, 1200][baseScore - 1] || 1200;
        this.score += multiplier * this.level;
        this.lines += linesToClear.length;

        // 升级
        if (Math.floor(this.lines / 10) + 1 !== this.level) {
            this.level = Math.floor(this.lines / 10) + 1;
            this.gameSpeed = Math.max(100, 500 - (this.level - 1) * 40);
        }

        this.updateUI();
    }

    gameLoop(currentTime) {
        if (!this.lastFallTime) {
            this.lastFallTime = currentTime;
        }

        const elapsed = currentTime - this.lastFallTime;

        if (elapsed >= this.gameSpeed) {
            if (!this.movePiece(0, 1)) {
                this.lockPiece();
            }
            this.lastFallTime = currentTime;
        }

        if (this.gameState === GameState.PLAYING) {
            this.gameLoopId = requestAnimationFrame((time) => this.gameLoop(time));
        }
    }

    start() {
        if (this.gameState === GameState.IDLE) {
            this.init();
            this.currentPiece = this.generatePiece();
        }

        this.gameState = GameState.PLAYING;
        this.lastFallTime = 0;
        this.gameLoopId = requestAnimationFrame((time) => this.gameLoop(time));

        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
    }

    togglePause() {
        if (this.gameState === GameState.PLAYING) {
            this.gameState = GameState.PAUSED;
            document.getElementById('pauseBtn').textContent = '继续';
            if (this.gameLoopId) {
                cancelAnimationFrame(this.gameLoopId);
            }
        } else if (this.gameState === GameState.PAUSED) {
            this.gameState = GameState.PLAYING;
            document.getElementById('pauseBtn').textContent = '暂停';
            this.lastFallTime = 0;
            this.gameLoopId = requestAnimationFrame((time) => this.gameLoop(time));
        }

        this.draw();
    }

    reset() {
        if (this.gameLoopId) {
            cancelAnimationFrame(this.gameLoopId);
        }

        this.init();
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('pauseBtn').textContent = '暂停';
        this.hideGameOverScreen();
    }

    endGame() {
        this.gameState = GameState.GAME_OVER;
        if (this.gameLoopId) {
            cancelAnimationFrame(this.gameLoopId);
        }

        this.showGameOverScreen();
    }

    showGameOverScreen() {
        const statusDiv = document.getElementById('gameStatus');
        document.getElementById('statusTitle').textContent = '游戏结束';
        document.getElementById('statusText').textContent = `最终分数: ${this.score} | 等级: ${this.level}`;
        statusDiv.classList.add('show');
    }

    hideGameOverScreen() {
        const statusDiv = document.getElementById('gameStatus');
        statusDiv.classList.remove('show');
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lines').textContent = this.lines;
    }

    draw() {
        // 清空主画布
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制网格
        this.ctx.strokeStyle = '#222';
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i <= ROWS; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * BLOCK_SIZE);
            this.ctx.lineTo(COLS * BLOCK_SIZE, i * BLOCK_SIZE);
            this.ctx.stroke();
        }

        for (let j = 0; j <= COLS; j++) {
            this.ctx.beginPath();
            this.ctx.moveTo(j * BLOCK_SIZE, 0);
            this.ctx.lineTo(j * BLOCK_SIZE, ROWS * BLOCK_SIZE);
            this.ctx.stroke();
        }

        // 绘制已固定的方块
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                if (this.grid[row][col] !== 0) {
                    this.drawBlock(this.ctx, col, row, this.grid[row][col]);
                }
            }
        }

        // 绘制当前下落的方块
        if (this.currentPiece && this.gameState !== GameState.GAME_OVER) {
            for (let row = 0; row < this.currentPiece.shape.length; row++) {
                for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
                    if (this.currentPiece.shape[row][col] === 1) {
                        const x = this.currentPiece.x + col;
                        const y = this.currentPiece.y + row;

                        if (y >= 0) {
                            this.drawBlock(this.ctx, x, y, this.currentPiece.color);
                        }
                    }
                }
            }
        }

        // 绘制暂停提示
        if (this.gameState === GameState.PAUSED) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('暂停中', this.canvas.width / 2, this.canvas.height / 2);
        }

        // 绘制下一个方块
        this.drawNextPiece();
    }

    drawBlock(context, col, row, color) {
        const x = col * BLOCK_SIZE;
        const y = row * BLOCK_SIZE;
        const padding = 1;

        context.fillStyle = color;
        context.fillRect(x + padding, y + padding, BLOCK_SIZE - 2 * padding, BLOCK_SIZE - 2 * padding);

        // 绘制高光效果
        context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        context.lineWidth = 1;
        context.strokeRect(x + padding, y + padding, BLOCK_SIZE - 2 * padding, BLOCK_SIZE - 2 * padding);
    }

    drawNextPiece() {
        // 清空下一个方块的画布
        this.nextCtx.fillStyle = '#000';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);

        if (!this.nextPiece) return;

        const blockSize = 15;
        const padding = 5;
        const shape = this.nextPiece.shape;

        // 计算偏移以居中显示
        const startX = (this.nextCanvas.width - shape[0].length * blockSize) / 2;
        const startY = (this.nextCanvas.height - shape.length * blockSize) / 2;

        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] === 1) {
                    const x = startX + col * blockSize;
                    const y = startY + row * blockSize;

                    this.nextCtx.fillStyle = this.nextPiece.color;
                    this.nextCtx.fillRect(x + padding / 2, y + padding / 2, blockSize - padding, blockSize - padding);

                    this.nextCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    this.nextCtx.lineWidth = 0.5;
                    this.nextCtx.strokeRect(x + padding / 2, y + padding / 2, blockSize - padding, blockSize - padding);
                }
            }
        }
    }
}

// 初始化游戏
window.addEventListener('DOMContentLoaded', () => {
    new TetrisGame();
});
