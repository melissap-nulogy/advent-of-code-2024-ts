import { Day } from '../day';
import Grid from '../helpers/Grid';

const DIRECTIONS = ['Up', 'Down', 'Left', 'Right', 'Up-Left', 'Up-Right', 'Down-Left', 'Down-Right'] as const;
type Direction = typeof DIRECTIONS[number];

class Day4 extends Day {
  constructor () {
    super(4);
    this.expectedResultPart1 = '2530';
    this.expectedResultPart2 = '1921';
  }

  solveForPartOne (input: string): string {
    const grid = new Grid(input, ['Up', 'Down', 'Left', 'Right', 'Up-Left', 'Up-Right', 'Down-Left', 'Down-Right']);
    let xmasCount = 0;
    for (let row = 0; row < grid.length(); row++) {
      for (let col = 0; col < grid.getRow(row).length; col++) {
        if (grid.getCol(row, col) === 'X') {
          DIRECTIONS.forEach((direction) => {
            if (this.checkSurroundingCharacters(grid, row, col, direction)) xmasCount++;
          });
        }
      }
    }

    return xmasCount.toString();
  }

  checkSurroundingCharacters (grid: Grid, row: number, col: number, direction: Direction): boolean {
    let [x, y] = grid.moveInDirection(row, col, direction);
    let found = true;
    const letters = ['M', 'A', 'S'];

    letters.forEach((letter) => {
      if (!(grid.isValidIndex(x, y) && grid.getCol(x, y) === letter)) {
        found = false;
      }

      [x, y] = grid.moveInDirection(x, y, direction);
    });

    return found;
  }

  solveForPartTwo (input: string): string {
    const grid = new Grid(input, ['Up', 'Down', 'Left', 'Right', 'Up-Left', 'Up-Right', 'Down-Left', 'Down-Right']);
    let xmasCount = 0;
    for (let row = 0; row < grid.length(); row++) {
      for (let col = 0; col < grid.getRow(row).length; col++) {
        if (grid.getCol(row, col) === 'A') {
          const upLeft = grid.getValueInDirection(row, col, 'Up-Left');
          const downRight = grid.getValueInDirection(row, col, 'Down-Right');
          if (upLeft === 'M') {
            if (downRight !== 'S') {
              continue;
            }
          } else if (upLeft === 'S') {
            if (downRight !== 'M') {
              continue;
            }
          } else {
            continue;
          }

          if (this.checkForAcross(grid, row, col, 'Up-Left', 'Down-Right') && this.checkForAcross(grid, row, col, 'Up-Right', 'Down-Left')) {
            xmasCount++;
          }
        }
      }
    }

    return xmasCount.toString();
  }

  checkForAcross (grid: Grid, row: number, col: number, direction1: Direction, direction2: Direction) {
    const letter1 = grid.getValueInDirection(row, col, direction1);
    const letter2 = grid.getValueInDirection(row, col, direction2);
    const lettersToCheck = ['M', 'S'];
    if (!lettersToCheck.includes(letter1) || !lettersToCheck.includes(letter2)) {
      return false;
    }

    if (letter1 === lettersToCheck[0] && letter2 !== lettersToCheck[1]) {
      return false;
    } else if (letter1 === lettersToCheck[1] && letter2 !== lettersToCheck[0]) {
      return false;
    }

    return true
  }
}

export default new Day4();
