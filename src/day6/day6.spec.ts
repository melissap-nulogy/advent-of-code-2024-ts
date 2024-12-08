import day6 from './index'
const jestConsole = console

beforeEach(() => {
  global.console = require('console')
})

afterEach(() => {
  global.console = jestConsole
})

describe('On Day 6', () => {
  it('part 1 works for their example', () => {
    const input: string = '....#.....\n' +
        '.........#\n' +
        '..........\n' +
        '..#.......\n' +
        '.......#..\n' +
        '..........\n' +
        '.#..^.....\n' +
        '........#.\n' +
        '#.........\n' +
        '......#...'

    expect(day6.solveForPartOne(input)).toBe('41')
  })

  it('part 2 works for their example', () => {
    const input: string = '....#.....\n' +
        '.........#\n' +
        '..........\n' +
        '..#.......\n' +
        '.......#..\n' +
        '..........\n' +
        '.#..^.....\n' +
        '........#.\n' +
        '#.........\n' +
        '......#...'

    expect(day6.solveForPartTwo(input)).toBe('6')
  })
})
