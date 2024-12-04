import { Day } from "../day";

type Direction = 'Up' | 'Down' | 'Left' | 'Right' | 'Up-Left' | 'Up-Right' | 'Down-Left' | 'Down-Right';

const DIRECTIONS: Direction[] = ['Up', 'Down', 'Left', 'Right', 'Up-Left', 'Up-Right', 'Down-Left', 'Down-Right'];
class Day4 extends Day {

    constructor(){
        super(4);
    }

    solveForPartOne(input: string): string {
        const grid = this.readGrid(input);
        let xmas_count = 0;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (grid[row][col] === 'X') {
                    DIRECTIONS.forEach((direction) => {
                        if(this.checkSurroundingCharacters(grid, row, col, direction)) xmas_count++;
                    });
                }
            }
        }

        return xmas_count.toString();
    }

    checkSurroundingCharacters(grid: string[][], row: number, col: number, direction: string): boolean {
        let [x,y] = this.moveInDirection(row, col, direction);
        let found = true;
        const letters = ['M', 'A', 'S'];

        letters.forEach((letter) => {
            if (!(x >= 0 && x < grid.length && y >= 0 && y < grid[x].length && grid[x][y] === letter)) {
                found = false;
            }

            [x,y] = this.moveInDirection(x, y, direction);
        });

        return found;
    }

    solveForPartTwo(input: string): string {
        const grid = this.readGrid(input);
        let xmas_count = 0;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                let passes = true;
                if (grid[row][col] === 'A') {
                    const upLeft = this.getValueInDirection(grid, row, col, "Up-Left");
                    const downRight = this.getValueInDirection(grid, row, col, "Down-Right");
                    if(upLeft == 'M') {
                        if(downRight !== 'S') {
                            passes = false;
                        }
                    } else if(upLeft == 'S') {
                        if(downRight !== 'M') {
                            passes = false;
                        }
                    } else {
                        passes = false;
                    }

                    const upRight = this.getValueInDirection(grid, row, col, "Up-Right");
                    const downLeft = this.getValueInDirection(grid, row, col, "Down-Left");
                    if(upRight == 'M') {
                        if(downLeft !== 'S') {
                            passes = false;
                        }
                    } else if(upRight == 'S') {
                        if(downLeft !== 'M') {
                            passes = false;
                        }
                    } else {
                        passes = false;
                    }

                    if(passes) {
                        xmas_count++;
                    }
                }
            }
        }

        return xmas_count.toString();
    }

    readGrid(input: string): string[][] {
        return input.split('\n').map((line) => line.split(''));
    }

    getValueInDirection(grid: string[][], row: number, col: number, direction: Direction) {
        let [x, y] = this.moveInDirection(row, col, direction);

        if(x >= 0 && x < grid.length && y >= 0 && y < grid[x].length) {
            return grid[x][y];
        }

        return "";
    }

    moveInDirection(row: number, col: number, direction: string): [number, number] {
        if (direction === 'Up') {
            return [row - 1, col];
        } else if (direction === 'Down') {
            return [row + 1, col];
        } else if (direction === 'Left') {
            return [row, col - 1];
        } else if (direction === 'Right') {
            return [row, col + 1];
        } else if (direction === 'Up-Left') {
            return [row - 1, col - 1];
        } else if (direction === 'Up-Right') {
            return [row - 1, col + 1];
        } else if (direction === 'Down-Left') {
            return [row + 1, col - 1];
        } else if (direction === 'Down-Right') {
            return [row + 1, col + 1];
        }

        return [row, col];
    }
}

export default new Day4;