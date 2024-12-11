import day8 from './index'
const jestConsole = console

beforeEach(() => {
  global.console = require('console')
})

afterEach(() => {
  global.console = jestConsole
})

describe('On Day 7', () => {
  it('part 1 works for their example', () => {
    const input: string = '............\n' +
        '........0...\n' +
        '.....0......\n' +
        '.......0....\n' +
        '....0.......\n' +
        '......A.....\n' +
        '............\n' +
        '............\n' +
        '........A...\n' +
        '.........A..\n' +
        '............\n' +
        '............'

    expect(day8.solveForPartOne(input)).toBe('14')
  })

  it('part 2 works for their example', () => {
    const input: string = '............\n' +
        '........0...\n' +
        '.....0......\n' +
        '.......0....\n' +
        '....0.......\n' +
        '......A.....\n' +
        '............\n' +
        '............\n' +
        '........A...\n' +
        '.........A..\n' +
        '............\n' +
        '............'

    expect(day8.solveForPartTwo(input)).toBe('?')
  })
})
