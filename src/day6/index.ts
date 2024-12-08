import { Day } from '../day'

const DIRECTIONS = ['Up', 'Right', 'Down', 'Left'] as const;
type Direction = typeof DIRECTIONS[number];
type Guard = {
    position: number[];
    directionIndex: number;
    };

class Day6 extends Day {
  constructor () {
    super(6)
    this.expectedResultPart1 = '?'
    this.expectedResultPart2 = '?'
  }

  solveForPartOne (input: string): string {
    const grid = this.readGrid(input);
    const guard: Guard | null = this.findGuard(grid);
    const uniquePositions = new Set<string>();

    if (guard === null) {
      throw new Error('Guard not found');
    }

    console.log(guard)

    let currentX = guard.position[0];
    let currentY = guard.position[1];
    let currentDirectionIndex = guard.directionIndex;
    let patrolling = true;

    while (patrolling) {
      uniquePositions.add(`${currentX},${currentY}`);

      // Check whats ahead
      if (this.getValueInDirection(grid, currentX, currentY, DIRECTIONS[currentDirectionIndex]) === '#') {
        // if its a obstacle turn 90 degrees right
        currentDirectionIndex = (currentDirectionIndex + 1) % 4;
      } else {
        [currentX, currentY] = this.moveInDirection(currentX, currentY, DIRECTIONS[currentDirectionIndex]);
      }

      patrolling = this.isValidIndex(grid, currentX, currentY);
    }

    return uniquePositions.size.toString();
  }

  getValueInDirection (grid: string[][], row: number, col: number, direction: Direction) {
    const [x, y] = this.moveInDirection(row, col, direction);

    if (this.isValidIndex(grid, x, y)) {
      return grid[x][y];
    }

    return '';
  }

  isValidIndex (grid: string[][], row: number, col: number): boolean {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
  }

  moveInDirection (row: number, col: number, direction: Direction): [number, number] {
    if (direction === 'Up') {
      return [row - 1, col];
    } else if (direction === 'Down') {
      return [row + 1, col];
    } else if (direction === 'Left') {
      return [row, col - 1];
    } else if (direction === 'Right') {
      return [row, col + 1];
    }

    return [row, col];
  }

  findGuard (grid: string[][]): Guard | null {
    let guard = null;

    for (let row = 0; row < grid.length && guard == null; row++) {
      for (let col = 0; col < grid[row].length && guard == null; col++) {
        if (grid[row][col] === '^') {
          guard = { position: [row, col], directionIndex: 0 };
        } else if (grid[row][col] === '>') {
          guard = { position: [row, col], directionIndex: 1 };
        } else if (grid[row][col] === 'v') {
          guard = { position: [row, col], directionIndex: 2 };
        } else if (grid[row][col] === '<') {
          guard = { position: [row, col], directionIndex: 3 };
        }
      }
    }

    return guard;
  }

  readGrid (input: string): string[][] {
    return input.split('\n').map((line) => line.split(''));
  }

  solveForPartTwo (input: string): string {
    return input
  }
}

export default new Day6()
