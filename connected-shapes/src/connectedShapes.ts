import * as fs from "fs";

export class ConnectedShapes {
  private grid: number[][];
  private visited: boolean[][];
  private rows: number;
  private cols: number;

  constructor(filename: string) {
    const content = fs.readFileSync(filename, "utf-8");
    if (content) {
      this.grid = content
        .trim()
        .split("\n")
        .map((row) => row.split("").map(Number));
      this.rows = this.grid.length;
      this.cols = this.grid[0].length;
      this.visited = Array(this.rows)
        .fill(null)
        .map(() => Array(this.cols).fill(false));
    } else {
      this.grid = [];
      this.rows = 0;
      this.cols = 0;
      this.visited = [];
    }
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
    if (
      row < 0 ||
      row >= this.rows ||
      col < 0 ||
      col >= this.cols ||
      this.grid[row][col] === 0 ||
      this.visited[row][col]
    ) {
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

function measureExecutionTime(filename: string): {
  count: number;
  executionTime: number;
} {
  const startTime = process.hrtime();

  const counter = new ConnectedShapes(filename);
  const count = counter.countConnectedShapes();

  const endTime = process.hrtime(startTime);
  const executionTime = endTime[0] * 1000 + endTime[1] / 1000000; // Convert to milliseconds

  return { count, executionTime };
}

function main() {
  const files = ["data/data_small.txt", "data/data_large.txt"];

  files.forEach((file) => {
    const { count, executionTime } = measureExecutionTime(file);
    console.log(`File: ${file}`);
    console.log(`Number of connected shapes: ${count}`);
    console.log(`Execution time: ${executionTime.toFixed(2)} ms`);
    console.log("---");
  });
}

main();
