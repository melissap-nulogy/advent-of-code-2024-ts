import day7 from './index'
const jestConsole = console

beforeEach(() => {
  global.console = require('console')
})

afterEach(() => {
  global.console = jestConsole
})

describe('On Day 7', () => {
  it('part 1 works for their example', () => {
    const input: string = '190: 10 19\n' +
        '3267: 81 40 27\n' +
        '83: 17 5\n' +
        '156: 15 6\n' +
        '7290: 6 8 6 15\n' +
        '161011: 16 10 13\n' +
        '192: 17 8 14\n' +
        '21037: 9 7 18 13\n' +
        '292: 11 6 16 20'

    expect(day7.solveForPartOne(input)).toBe('3749')
  })

  it('part 2 works for their example', () => {
    const input: string = '190: 10 19\n' +
        '3267: 81 40 27\n' +
        '83: 17 5\n' +
        '156: 15 6\n' +
        '7290: 6 8 6 15\n' +
        '161011: 16 10 13\n' +
        '192: 17 8 14\n' +
        '21037: 9 7 18 13\n' +
        '292: 11 6 16 20'

    expect(day7.solveForPartTwo(input)).toBe('?')
  })
})
