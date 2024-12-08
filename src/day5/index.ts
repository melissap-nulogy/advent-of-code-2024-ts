import { Day } from '../day'

class Rule {
  firstNumber: number;
  secondNumber: number;
  constructor (firstNumber: number, secondNumber: number) {
    this.firstNumber = firstNumber
    this.secondNumber = secondNumber
  }

  public passesRuleAt (index: number, update: number[]) : boolean {
    let pass = true
    for (let i = 0; i < index; i++) {
      if (update[i] === this.secondNumber) {
        pass = false
        break
      }
    }

    return pass
  }

  public failingIndex (index: number, update: number[]) : number {
    let failingIndex = -1;
    for (let i = 0; i < index; i++) {
      if (update[i] === this.secondNumber) {
        failingIndex = i;
        break;
      }
    }

    return failingIndex;
  }
}

class Day5 extends Day {
  constructor () {
    super(5)
    this.expectedResultPart1 = '4462'
    this.expectedResultPart2 = '6767'
  }

  private parseInput (input: string): { rules: Map<number, Rule[]>, updates: number[][] } {
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
    return { rules, updates }
  }

  solveForPartOne (input: string): string {
    const { rules, updates } = this.parseInput(input)
    let result = 0

    updates.forEach((update) => {
      if (this.checkRules(rules, update)) {
        const middle = Math.floor(update.length / 2)
        result += update[middle]
      }
    })

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
    const { rules, updates } = this.parseInput(input)
    let result = 0

    updates.forEach((update) => {
      if (!this.checkRules(rules, update)) {
        let fixedUpdate = update
        while (!this.checkRules(rules, fixedUpdate)) {
          fixedUpdate = this.fixUpdate(rules, fixedUpdate)
        }
        const middle = Math.floor(fixedUpdate.length / 2)
        result += fixedUpdate[middle]
      }
    })

    return result.toString()
  }

  fixUpdate (rules: Map<number, Rule[]>, update: number[]): number[] {
    const fixedUpdate = [...update];
    let hasFix = false;
    for (let i = 0; i < fixedUpdate.length && !hasFix; i++) {
      const x = fixedUpdate[i];
      if (rules.has(x)) {
        const rulesForX = rules.get(x)!
        for (let j = 0; j < rulesForX.length && !hasFix; j++) {
          const rule = rulesForX[j]
          const failingIndex = rule.failingIndex(i, fixedUpdate);
          if (failingIndex !== -1) {
            fixedUpdate[failingIndex] = rule.firstNumber
            fixedUpdate[i] = rule.secondNumber

            hasFix = true;
          }
        }
      }
    }

    return fixedUpdate;
  }
}

export default new Day5()
