const DIRECTIONS = ['Up', 'Down', 'Left', 'Right', 'Up-Left', 'Up-Right', 'Down-Left', 'Down-Right'] as const;
type Direction = typeof DIRECTIONS[number];
class Grid {
    private grid: string[][];
    private validDirections: Direction[];
    constructor (input: string, validDirections: Direction[]) {
      this.grid = this.readGrid(input);
      this.validDirections = validDirections;
    }

    getRow (index: number): string[] {
      return this.grid[index];
    }

    getCol (row: number, col: number): string {
      return this.grid[row][col];
    }

    set (row: number, col: number, value: string) {
      this.grid[row][col] = value;
    }

    length (): number {
      return this.grid.length;
    }

    dup (): Grid {
      const grid = new Grid('', this.validDirections);
      grid.grid = this.grid.map((x) => [...x]);
      return grid;
    }

    readGrid (input: string) {
      return input.split('\n').map((x) => x.split(''));
    }

    getValueInDirection (row: number, col: number, direction: Direction) {
      const [x, y] = this.moveInDirection(row, col, direction);

      if (this.isValidIndex(x, y)) {
        return this.grid[x][y];
      }

      return '';
    }

    isValidIndex (row: number, col: number): boolean {
      return row >= 0 && row < this.grid.length && col >= 0 && col < this.grid[row].length;
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
}

export default Grid;
