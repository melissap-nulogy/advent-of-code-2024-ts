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
            if (!(this.isValidIndex(grid,x,y) && grid[x][y] === letter)) {
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
                            continue;
                        }
                    } else if(upLeft == 'S') {
                        if(downRight !== 'M') {
                            continue;
                        }
                    } else {
                        continue;
                    }

                    if(this.checkForAcross(grid, row, col, "Up-Left", "Down-Right") && this.checkForAcross(grid, row, col, "Up-Right", "Down-Left")) {
                        xmas_count++;
                    }
                }
            }
        }

        return xmas_count.toString();
    }

    checkForAcross(grid: string[][], row: number, col: number, direction1: Direction, direction2: Direction) {
        const letterAtDirection1 = this.getValueInDirection(grid, row, col, direction1);
        const letterAtDirection2 = this.getValueInDirection(grid, row, col, direction2);
        if(letterAtDirection1 == 'M') {
            if(letterAtDirection2 !== 'S') {
                return false;
            }
        } else if(letterAtDirection1 == 'S') {
            if(letterAtDirection2 !== 'M') {
                return false;
            }
        } else {
            return false;
        }

        return true
    }

    readGrid(input: string): string[][] {
        return input.split('\n').map((line) => line.split(''));
    }

    getValueInDirection(grid: string[][], row: number, col: number, direction: Direction) {
        let [x, y] = this.moveInDirection(row, col, direction);

        if(this.isValidIndex(grid, x, y)) {
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

    isValidIndex(grid: string[][], row: number, col: number): boolean {
        return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
    }
}

export default new Day4;