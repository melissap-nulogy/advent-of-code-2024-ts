import { Day } from '../day'
import Grid from '../helpers/Grid'

const DIRECTIONS = ['Up', 'Right', 'Down', 'Left'] as const;
type Direction = typeof DIRECTIONS[number];
type Guard = {
    position: number[];
    directionIndex: number;
    };

class Day6 extends Day {
  constructor () {
    super(6)
    this.expectedResultPart1 = '4826'
    this.expectedResultPart2 = '1721'
  }

  solveForPartOne (input: string): string {
    const grid = new Grid(input, ['Up', 'Right', 'Down', 'Left']);
    const guard: Guard | null = this.findGuard(grid);
    const uniquePositions = new Set<string>();

    if (guard === null) {
      throw new Error('Guard not found');
    }

    this.checkGridForLoop(grid, guard, uniquePositions)

    return uniquePositions.size.toString();
  }

  findGuard (grid: Grid): Guard | null {
    let guard = null;

    for (let row = 0; row < grid.length() && guard == null; row++) {
      for (let col = 0; col < grid.getRow(row).length && guard == null; col++) {
        if (grid.getCol(row, col) === '^') {
          guard = { position: [row, col], directionIndex: 0 };
        } else if (grid.getCol(row, col) === '>') {
          guard = { position: [row, col], directionIndex: 1 };
        } else if (grid.getCol(row, col) === 'v') {
          guard = { position: [row, col], directionIndex: 2 };
        } else if (grid.getCol(row, col) === '<') {
          guard = { position: [row, col], directionIndex: 3 };
        }
      }
    }

    return guard;
  }

  solveForPartTwo (input: string): string {
    const grid = new Grid(input, ['Up', 'Right', 'Down', 'Left']);
    const guard: Guard | null = this.findGuard(grid);
    const positionsWithLoops = new Set<string>();

    if (guard === null) {
      throw new Error('Guard not found');
    }

    for (let row = 0; row < grid.length(); row++) {
      for (let col = 0; col < grid.getRow(row).length; col++) {
        if (grid.getCol(row, col) === '#') continue;

        const gridToCheck = grid.dup();
        gridToCheck.set(row, col, '#');
        if (this.checkGridForLoop(gridToCheck, guard!)) {
          positionsWithLoops.add(`${row},${col}`);
        }
      }
    }

    return positionsWithLoops.size.toString();
  }

  checkGridForLoop (grid: Grid, guard: Guard, uniquePositions = new Set<string>()): boolean {
    let currentX = guard.position[0];
    let currentY = guard.position[1];
    let currentDirectionIndex = guard.directionIndex;
    let patrolling = true;
    let hasLoop = false;
    const visitedWithDirection = new Set<string>();

    while (patrolling) {
      if (visitedWithDirection.has(`${currentX},${currentY},${currentDirectionIndex}`)) {
        hasLoop = true;
        patrolling = false;
        // detected loop so good position
      } else {
        uniquePositions.add(`${currentX},${currentY}`);
        visitedWithDirection.add(`${currentX},${currentY},${currentDirectionIndex}`);
        // Check whats ahead
        if (grid.getValueInDirection(currentX, currentY, DIRECTIONS[currentDirectionIndex]) === '#') {
          // if its a obstacle turn 90 degrees right
          currentDirectionIndex = (currentDirectionIndex + 1) % 4;
        } else {
          [currentX, currentY] = grid.moveInDirection(currentX, currentY, DIRECTIONS[currentDirectionIndex]);
        }

        patrolling = grid.isValidIndex(currentX, currentY);
      }
    }

    return hasLoop;
  }
}

export default new Day6()
