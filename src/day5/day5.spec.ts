import day5 from './index';
const jestConsole = console;

beforeEach(() => {
    global.console = require('console');
});

afterEach(() => {
    global.console = jestConsole;
});

describe('On Day 5', () =>{
    it(`part 1 works for their example`, ()=>{
        const input: string =   '';

        expect(day5.solveForPartOne(input)).toBe("");
    })

    it(`part 2 works for their example`, ()=>{
        const input: string = '';

        expect(day5.solveForPartTwo(input)).toBe("");
    })
});