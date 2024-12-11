import { Day } from '../day'
import Grid from '../helpers/Grid';

class Day8 extends Day {
  constructor () {
    super(8)
    this.expectedResultPart1 = '299'
    this.expectedResultPart2 = '?'
  }

  solveForPartOne (input: string): string {
    const grid = new Grid(input, []);
    const letterIndices = new Map<string, number[][]>();
    const uniqueIndices = new Set<string>();

    for (let row = 0; row < grid.length(); row++) {
      for (let col = 0; col < grid.getRow(row).length; col++) {
        const letter = grid.getValue(row, col);

        if (letter !== '.') {
          if (!letterIndices.has(letter)) {
            letterIndices.set(letter, []);
          }

          letterIndices.get(letter)!.push([row, col]);
        }
      }
    }

    letterIndices.forEach((indices, letter) => {
      // get all combinations
      // Sort by row
      indices.forEach((firstGroup, index) => {
        const remainingGroups = indices.slice(index + 1);
        remainingGroups.forEach((secondGroup) => {
          const rowDiff = firstGroup[0] - secondGroup[0];
          const colDiff = firstGroup[1] - secondGroup[1];

          const newRow1 = firstGroup[0] + rowDiff
          const newCol1 = firstGroup[1] + colDiff

          if (grid.isValidIndex(newRow1, newCol1)) {
            uniqueIndices.add(`${newRow1},${newCol1}`)
          }

          const newRow2 = secondGroup[0] - rowDiff
          const newCol2 = secondGroup[1] - colDiff

          if (grid.isValidIndex(newRow2, newCol2)) {
            uniqueIndices.add(`${newRow2},${newCol2}`)
          }
        })
      })
    });

    return uniqueIndices.size.toString();
  }

  solveForPartTwo (input: string): string {
    return '';
  }

  readGrid (input: string) {
    return input.split('\n').map((x) => x.split(''));
  }
}

export default new Day8()
