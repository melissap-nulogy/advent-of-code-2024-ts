import { Day } from '../day'
import Grid from '../helpers/Grid';

const DIRECTIONS = ['Up', 'Down', 'Left', 'Right'] as const;
class Day10 extends Day {
  constructor () {
    super(10)
    this.expectedResultPart1 = '796'
    this.expectedResultPart2 = '1942'
  }

  solveForPartOne (input: string): string {
    const grid = new Grid(input, ['Up', 'Down', 'Left', 'Right']);
    const trailheads = this.findTrailheads(grid);

    let countOfNines = 0;

    console.log(trailheads);
    trailheads.forEach((trailhead) => {
      const counter = this.countPaths(grid, trailhead[0], trailhead[1]);
      countOfNines += (new Set<string>(counter)).size;
    });
    return countOfNines.toString();
  }

  findTrailheads (grid: Grid): number[][] {
    const trailheads = [];
    for (let i = 0; i < grid.length(); i++) {
      for (let j = 0; j < grid.getRow(i).length; j++) {
        if (grid.getValue(i, j) === '0') {
          trailheads.push([i, j]);
        }
      }
    }
    return trailheads;
  }

  countPaths (grid: Grid, row: number, col: number, path: number[][] = []): string[] {
    const currentValue = parseInt(grid.getValue(row, col))

    const nines: string[] = [];
    DIRECTIONS.forEach((direction) => {
      const [newRow, newCol] = grid.moveInDirection(row, col, direction);
      if (grid.isValidIndex(newRow, newCol)) {
        const nextValue = parseInt(grid.getValue(newRow, newCol));
        if (nextValue === currentValue + 1) {
          if (nextValue === 9) {
            nines.push(`${newRow},${newCol}`);
          } else {
            const newPath = path.concat([[row, col]]);
            nines.push(...this.countPaths(grid, newRow, newCol, newPath));
          }
        }
      }
    });

    return nines;
  }

  solveForPartTwo (input: string): string {
    const grid = new Grid(input, ['Up', 'Down', 'Left', 'Right']);
    const trailheads = this.findTrailheads(grid);

    let countOfNines = 0;

    trailheads.forEach((trailhead) => {
      const counter = this.countPaths(grid, trailhead[0], trailhead[1]);
      countOfNines += counter.length;
    });
    return countOfNines.toString();
  }
}

export default new Day10()
