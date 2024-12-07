import day4 from './index';
const jestConsole = console;

beforeEach(() => {
    global.console = require('console');
});

afterEach(() => {
    global.console = jestConsole;
});

describe('On Day 4', () =>{
    it(`part 1 works for their example`, ()=>{
        const input: string =   'MMMSXXMASM\n' +
                                'MSAMXMSMSA\n' +
                                'AMXSXMAAMM\n' +
                                'MSAMASMSMX\n' +
                                'XMASAMXAMM\n' +
                                'XXAMMXXAMA\n' +
                                'SMSMSASXSS\n' +
                                'SAXAMASAAA\n' +
                                'MAMMMXMMMM\n' +
                                'MXMXAXMASX';

        expect(day4.solveForPartOne(input)).toBe("18");
    })

    it(`part 2 works for their example`, ()=>{
        const input: string = 'MMMSXXMASM\n' +
            'MSAMXMSMSA\n' +
            'AMXSXMAAMM\n' +
            'MSAMASMSMX\n' +
            'XMASAMXAMM\n' +
            'XXAMMXXAMA\n' +
            'SMSMSASXSS\n' +
            'SAXAMASAAA\n' +
            'MAMMMXMMMM\n' +
            'MXMXAXMASX';

        expect(day4.solveForPartTwo(input)).toBe("9");
    })
});