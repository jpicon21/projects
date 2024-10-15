# Connected Shapes

This project implements a solution to count the number of connected shapes in a grid of 0's and 1's. It's written in TypeScript and designed to process input from text files.

## Problem Description

The program reads a text file containing 0's and 1's in a regular N x M sized grid. It then finds the number of "connected shapes" in the data. A connected shape is defined as a group of 1's that are immediately adjacent to each other (left, right, top, or bottom). Diagonal connections are not considered.

## Installation

To set up this project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/jpicon21/connected-shapes.git
   cd connected-shapes
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Place your input files in the `data` directory. The project comes with two sample files:
   - `data_small.txt`
   - `data_large.txt`

2. Build the project:
   ```
   npm run build
   ```

3. Run the program:
   ```
   npm start
   ```

The program will process both input files and output the number of connected shapes found in each.

## Project Structure

```
connected-shapes-counter/
├── data/
│   ├── data_small.txt
│   └── data_large.txt
├── src/
│   └── connectedShapes.ts
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

The solution uses a depth-first search (DFS) algorithm to explore connected shapes in the grid. It processes each cell in the grid, and when it finds a '1' that hasn't been visited yet, it starts a DFS from that cell to mark all connected '1's as part of the same shape.

## Performance Measurement

This project now includes a feature to measure the execution time for processing each input file. When you run the program, it will output not only the number of connected shapes found but also the time taken to process each file.

Example output:

```
File: data/data_small.txt
Number of connected shapes: 3
Execution time: 1.23 ms
---
File: data/data_large.txt
Number of connected shapes: 42
Execution time: 15.67 ms
---
```

This feature allows you to compare the performance of the algorithm on different input sizes and can be useful for optimization purposes.

## Testing

This project uses Jest for unit testing. To run the tests:

1. Make sure you have installed the dependencies:
   ```
   npm install
   ```

2. Run the test command:
   ```
   npm test
   ```

The tests cover various scenarios including small and large grids, empty grids, and grids with no connected shapes.

To add more tests, you can modify the `src/__tests__/connectedShapes.test.ts` file.