import { Day } from "../day";

class Day3 extends Day {

    constructor(){
        super(3);
    }

    solveForPartOne(input: string): string {
        const matches = input.matchAll(/mul\((\d+),(\d+)\)/g)
        let total = 0;
        for(const match of matches) {
            total += parseInt(match[1]) * parseInt(match[2]);
        }
        return total.toString();
    }

    solveForPartTwo(input: string): string {
        const matches = input.matchAll(/do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g);
        let total = 0;
        let calculationEnabled = true;
        for(const match of matches) {
            if(match[0] === "do()" || match[0] === "don't()") {
                calculationEnabled = match[0] === "do()" ? true : match[0] === "don't()" ? false : calculationEnabled;
            }
            else if(calculationEnabled) {
                total += parseInt(match[1]) * parseInt(match[2]);
            }

        }
        return total.toString();
    }

}

export default new Day3;