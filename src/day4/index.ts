import { Day } from "../day";

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
                    // check the 8 surrounding characters
                    if(this.checkSurroundingCharacters(grid, row+1, col, "Down")) xmas_count++;
                    if(this.checkSurroundingCharacters(grid, row+1, col+1, "Down-Right")) xmas_count++;
                    if(this.checkSurroundingCharacters(grid, row+1, col-1, "Down-Left")) xmas_count++;

                    if(this.checkSurroundingCharacters(grid, row-1, col, "Up")) xmas_count++;
                    if(this.checkSurroundingCharacters(grid, row-1, col+1, "Up-Right")) xmas_count++;
                    if(this.checkSurroundingCharacters(grid, row-1, col-1, "Up-Left")) xmas_count++;

                    if(this.checkSurroundingCharacters(grid, row, col+1, "Right")) xmas_count++;
                    if(this.checkSurroundingCharacters(grid, row, col-1, "Left")) xmas_count++;
                }
            }
        }

        return xmas_count.toString();
    }

    checkSurroundingCharacters(grid: string[][], row: number, col: number, direction: string): boolean {
        let x = row;
        let y = col;
        let found = true;
        const letters = ['M', 'A', 'S'];

        letters.forEach((letter) => {
            if (!(x >= 0 && x < grid.length && y >= 0 && y < grid[x].length && grid[x][y] === letter)) {
                found = false;
            }

            if (direction === 'Up') {
                x--;
            } else if (direction === 'Down') {
                x++;
            } else if (direction === 'Left') {
                y--;
            } else if (direction === 'Right') {
                y++;
            } else if (direction === 'Up-Left') {
                x--;
                y--;
            } else if (direction === 'Up-Right') {
                x--;
                y++;
            } else if (direction === 'Down-Left') {
                x++;
                y--;
            } else if (direction === 'Down-Right') {
                x++;
                y++;
            }
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

    getValueInDirection(grid: string[][], row: number, col: number, direction: string) {
        let [x, y] = [row, col];
        if (direction === 'Up') {
            x--;
        } else if (direction === 'Down') {
            x++;
        } else if (direction === 'Left') {
            y--;
        } else if (direction === 'Right') {
            y++;
        } else if (direction === 'Up-Left') {
            x--;
            y--;
        } else if (direction === 'Up-Right') {
            x--;
            y++;
        } else if (direction === 'Down-Left') {
            x++;
            y--;
        } else if (direction === 'Down-Right') {
            x++;
            y++;
        }

        if(x >= 0 && x < grid.length && y >= 0 && y < grid[x].length) {
            return grid[x][y];
        }

        return "";
    }
}

export default new Day4;