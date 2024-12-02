import { Day } from "../day";

class Day0 extends Day {

    constructor(){
        super(0);
    }

    solveForPartOne(input: string): string {
        let list1 : number[] = [];
        let list2: number[] = [];

        input.split('\n').map((x) => {
            const [num1, num2] = x.split('   ').map(Number)
            list1.push(num1);
            list2.push(num2);
        });

        list1 = list1.sort((a, b) => a - b);
        list2 = list2.sort((a, b) => a - b);

        return list1.reduce((acc, x, i) => acc + Math.abs(x - list2[i]), 0).toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day0;