import day10 from './index'
const jestConsole = console

beforeEach(() => {
  global.console = require('console')
})

afterEach(() => {
  global.console = jestConsole
})

describe('On Day 10', () => {
  it('part 1 works for their example', () => {
    const input: string = '89010123\n' +
        '78121874\n' +
        '87430965\n' +
        '96549874\n' +
        '45678903\n' +
        '32019012\n' +
        '01329801\n' +
        '10456732'

    expect(day10.solveForPartOne(input)).toBe('36')
  })

  it('part 2 works for their example', () => {
    const input: string = '89010123\n' +
        '78121874\n' +
        '87430965\n' +
        '96549874\n' +
        '45678903\n' +
        '32019012\n' +
        '01329801\n' +
        '10456732'

    expect(day10.solveForPartTwo(input)).toBe('?')
  })
})
