import day3 from './index';
const jestConsole = console;

beforeEach(() => {
    global.console = require('console');
});

afterEach(() => {
    global.console = jestConsole;
});

describe('On Day 2', () =>{
    it(`part 1 works for their example`, ()=>{
        const input: string = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

        expect(day3.solveForPartOne(input)).toBe("161");
    })

    it(`part 2 works for their example`, ()=>{
        const input: string = '';

        expect(day3.solveForPartTwo(input)).toBe("4");
    })
});