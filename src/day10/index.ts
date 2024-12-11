import { Day } from '../day'
import Grid from '../helpers/Grid';

class Day10 extends Day {
  constructor () {
    super(8)
    this.expectedResultPart1 = '299'
    this.expectedResultPart2 = '?'
  }

  solveForPartOne (input: string): string {
    return ''
  }

  solveForPartTwo (input: string): string {
    return '';
  }

  readGrid (input: string) {
    return input.split('\n').map((x) => x.split(''));
  }
}

export default new Day10()
