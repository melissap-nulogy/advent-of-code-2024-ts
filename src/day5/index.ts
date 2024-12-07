import { Day } from '../day'

class Rule {
    private firstNumber: number;
    private secondNumber: number;
    constructor (firstNumber: number, secondNumber: number) {
      this.firstNumber = firstNumber
      this.secondNumber = secondNumber
    }

    public passesRuleAt (index: number, update: number[]) : boolean {
      // Assume that we mapped the rules only to the first number
      // That means it needs to be first so make sure the second number is not before it
      let pass = true
      for (let i = 0; i < index; i++) {
        if (update[i] === this.secondNumber) {
          pass = false
          break
        }
      }

      return pass
    }
}
class Day5 extends Day {
  constructor () {
    super(5)
    this.expectedResultPart1 = '4462'
    this.expectedResultPart2 = '?'
  }

  solveForPartOne (input: string): string {
    // Read the rules one by one
    let readingRules = true
    const rules = new Map<number, Rule[]>()
    const updates: number[][] = []
    input.split('\n').forEach((x) => {
      if (x === '') {
        readingRules = false
      } else if (readingRules) {
        const [firstPage, secondPage] = x.split('|').map(Number)
        const rule = new Rule(firstPage, secondPage)

        if (!rules.has(firstPage)) {
          rules.set(firstPage, [rule])
        } else {
          rules.get(firstPage)!.push(rule)
        }
      } else {
        updates.push(x.split(',').map(Number))
      }
    })

    let result = 0

    updates.forEach((update) => {
      if (this.checkRules(rules, update)) {
        // find the middle and add it to results
        const middle = Math.floor(update.length / 2)
        result += update[middle]
      }
    })

    // Go though pages, get rules for current number,
    //  do they all pass? Continue to next number
    // else false
    return result.toString()
  }

  checkRules (rules: Map<number, Rule[]>, update: number[]): boolean {
    let passes = true
    update.forEach((x, i) => {
      if (rules.has(x)) {
        const rulesForX = rules.get(x)!
        rulesForX.forEach((rule) => {
          if (!rule.passesRuleAt(i, update)) {
            passes = false
          }
        })
      }
    })

    return passes
  }

  solveForPartTwo (input: string): string {
    return '?'
  }
}

export default new Day5()
