import { Day } from "../day";

class Day3 extends Day {

    constructor(){
        super(3);
    }

    solveForPartOne(input: string): string {
        console.log(input.match(/mul\((\d+),(\d+)\)/g))
        const matches = input.matchAll(/mul\((\d+),(\d+)\)/g)
        let total = 0;
        for(const match of matches) {
            total += parseInt(match[1]) * parseInt(match[2]);
        }
        return total.toString();
    }

    solveForPartTwo(input: string): string {
        return "0"
    }

}

export default new Day3;