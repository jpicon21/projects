import * as fs from 'fs';

class ConnectedShapesCounter {
    private grid: number[][];
    private visited: boolean[][];
    private rows: number;
    private cols: number;

    constructor(filename: string) {
        const content = fs.readFileSync(filename, 'utf-8');
        this.grid = content.trim().split('\n').map(row => row.split('').map(Number));
        this.rows = this.grid.length;
        this.cols = this.grid[0].length;
        this.visited = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
    }

    public countConnectedShapes(): number {
        let count = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 1 && !this.visited[i][j]) {
                    this.dfs(i, j);
                    count++;
                }
            }
        }
        return count;
    }

    private dfs(row: number, col: number): void {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols || 
            this.grid[row][col] === 0 || this.visited[row][col]) {
            return;
        }

        this.visited[row][col] = true;

        // Check adjacent cells (up, down, left, right)
        this.dfs(row - 1, col);
        this.dfs(row + 1, col);
        this.dfs(row, col - 1);
        this.dfs(row, col + 1);
    }
}

function main() {
    const smallCounter = new ConnectedShapesCounter('data/data_small.txt');
    console.log('Number of connected shapes in data_small.txt:', smallCounter.countConnectedShapes());

    const largeCounter = new ConnectedShapesCounter('data/data_large.txt');
    console.log('Number of connected shapes in data_large.txt:', largeCounter.countConnectedShapes());
}

main();