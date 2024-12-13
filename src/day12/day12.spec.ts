import day12 from './index'
const jestConsole = console

beforeEach(() => {
  global.console = require('console')
})

afterEach(() => {
  global.console = jestConsole
})

describe('On Day 12', () => {
  it('part 1 works for their first explanation', () => {
    const input: string = 'AAAA\n' +
        'BBCD\n' +
        'BBCC\n' +
        'EEEC'

    expect(day12.solveForPartOne(input)).toBe('140')
  });

  it('part 1 works for their second explanation', () => {
    const input: string = 'OOOOO\n' +
        'OXOXO\n' +
        'OOOOO\n' +
        'OXOXO\n' +
        'OOOOO'

    expect(day12.solveForPartOne(input)).toBe('772')
  });

  it('part 1 works for their example', () => {
    const input: string = 'RRRRIICCFF\n' +
        'RRRRIICCCF\n' +
        'VVRRRCCFFF\n' +
        'VVRCCCJFFF\n' +
        'VVVVCJJCFE\n' +
        'VVIVCCJJEE\n' +
        'VVIIICJJEE\n' +
        'MIIIIIJJEE\n' +
        'MIIISIJEEE\n' +
        'MMMISSJEEE'

    expect(day12.solveForPartOne(input)).toBe('1930')
  })

  it('part 2 works for their example', () => {
    const input: string = ''

    expect(day12.solveForPartTwo(input)).toBe('81')
  })
})
