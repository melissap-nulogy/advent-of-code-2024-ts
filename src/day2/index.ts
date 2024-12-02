import { Day } from "../day";

class Day2 extends Day {

    constructor(){
        super(2);
    }

    solveForPartOne(input: string): string {
        let validCount: number = 0;
        this.getRecords(input).forEach((record) => {
            let index = 0;
            let valid = true;
            let isIncreasing = null;
            while (index < record.length-1 && valid) {
                valid = this.isValid(record, index, isIncreasing);
                isIncreasing = record[index] < record[index + 1];
                index++;
            }
            if(valid) validCount++;
        });

        return validCount.toString();
    }

    isValid(record: number[], index: number, isIncreasing: boolean | null): boolean {
        let newIsIncreasing = record[index] < record[index + 1];

        if(isIncreasing != null && isIncreasing != newIsIncreasing) {
            return false;
        }

        const diff =Math.abs(record[index] - record[index + 1]);

        return diff <= 3 && diff > 0;
    }

    solveForPartTwo(input: string): string {
        return ""
    }

    getRecords(input: string): number[][] {
        return input.split('\n').map((x) => {
            return x.split(' ').map(Number)
        });
    }
}

export default new Day2;