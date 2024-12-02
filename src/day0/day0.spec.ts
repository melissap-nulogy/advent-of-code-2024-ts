import day0 from './index';

describe('On Day 0', () =>{
    it(`part 1 works for their example`, ()=>{
        const input: string = '3   4\n' +
            '4   3\n' +
            '2   5\n' +
            '1   3\n' +
            '3   9\n' +
            '3   3';

        expect(day0.solveForPartOne(input)).toBe("11");
    })

    it(`part 2 works for their example`, ()=>{
        const input: string = '3   4\n' +
            '4   3\n' +
            '2   5\n' +
            '1   3\n' +
            '3   9\n' +
            '3   3';

        expect(day0.solveForPartTwo(input)).toBe("31");
    })
});