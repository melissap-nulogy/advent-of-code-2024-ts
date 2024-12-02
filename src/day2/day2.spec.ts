import day0 from './index';
const jestConsole = console;

beforeEach(() => {
    global.console = require('console');
});

afterEach(() => {
    global.console = jestConsole;
});

describe('On Day 2', () =>{
    it(`part 1 works for their example`, ()=>{
        const input: string = '7 6 4 2 1\n' +
        '1 2 7 8 9\n' +
        '9 7 6 2 1\n' +
        '1 3 2 4 5\n' +
        '8 6 4 4 1\n' +
        '1 3 6 7 9';

        expect(day0.solveForPartOne(input)).toBe("2");
    })

    it(`part 2 works for their example`, ()=>{
        const input: string = '7 6 4 2 1\n' +
            '1 2 7 8 9\n' +
            '9 7 6 2 1\n' +
            '1 3 2 4 5\n' +
            '8 6 4 4 1\n' +
            '1 3 6 7 9';

        expect(day0.solveForPartTwo(input)).toBe("4");
    })
});