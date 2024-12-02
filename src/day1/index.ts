import { Day } from "../day";

class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): string {
        const [list1, list2] = this.getSortedLists(input);

        return list1.reduce((acc, x, i) => acc + Math.abs(x - list2[i]), 0).toString();
    }

    solveForPartTwo(input: string): string {
        const [list1, list2] = this.getSortedLists(input);

        return list1.reduce((acc, x, i) => acc + Math.abs(x * list2.filter((y) => x == y).length), 0).toString();

    }

    getSortedLists(input: string): [number[], number[]] {
        let list1 : number[] = [];
        let list2: number[] = [];

        input.split('\n').map((x) => {
            const [num1, num2] = x.split('   ').map(Number)
            list1.push(num1);
            list2.push(num2);
        });

        list1 = list1.sort((a, b) => a - b);
        list2 = list2.sort((a, b) => a - b);

        return [list1, list2];
    }
}

export default new Day1;