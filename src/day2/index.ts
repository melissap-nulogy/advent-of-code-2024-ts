import { Day } from "../day";

class Day2 extends Day {

    constructor(){
        super(2);
        this.expectedResultPart1 = "606";
        this.expectedResultPart2 = "644";
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
        let validCount: number = 0;
        this.getRecords(input).forEach((record) => {
            const result = this.calculateValidity(record, record, 0)
            if(result) validCount++;
        });

        return validCount.toString();
    }

    calculateValidity(record: number[], newRecord: number[], indexToRemove: number) :boolean{
        let index = 0;
        let valid = true;
        let isIncreasing = null;
        while (index < newRecord.length-1 && valid) {
            valid = this.isValid(newRecord, index, isIncreasing);
            isIncreasing = newRecord[index] < newRecord[index + 1];
            index++;
        }
        if(valid) {
            return true;
        } else {
            if (indexToRemove > newRecord.length) {
                return false;
            }
            let recordTemp = [...record];
            recordTemp.splice(indexToRemove, 1);
            return this.calculateValidity(record, recordTemp, indexToRemove+1);
        }
    }

    getRecords(input: string): number[][] {
        return input.split('\n').map((x) => {
            return x.split(' ').map(Number)
        });
    }
}

export default new Day2;