import { Day } from '../day'
import Grid from '../helpers/Grid';

const DIRECTIONS = ['Up', 'Down', 'Left', 'Right'] as const;
class Day12 extends Day {
  constructor () {
    super(12)
    this.expectedResultPart1 = '?'
    this.expectedResultPart2 = '?'
  }

  solveForPartOne (input: string): string {
    const grid = new Grid(input, ['Up', 'Down', 'Left', 'Right']);

    return '?';
  }

  solveForPartTwo (input: string): string {
    const grid = new Grid(input, ['Up', 'Down', 'Left', 'Right']);

    return '';
  }
}

export default new Day12()
