import { Day } from '../day'

class Day7 extends Day {
  constructor () {
    super(7)
    this.expectedResultPart1 = '20665830408335'
    this.expectedResultPart2 = '354060705047464'
  }

  solveForPartOne (input: string): string {
    return this.solve(false, input)
  }

  solveForPartTwo (input: string): string {
    return this.solve(true, input)
  }

  solve (doCombine: boolean, input: string): string {
    const equationList = input.split('\n');
    let calculatedAnswer = 0;

    equationList.forEach(equation => {
      const [answerString, equationString] = equation.split(': ');
      const answer = parseInt(answerString)
      const numbers = equationString.split(' ').map(Number);

      const rootNode = new Node(numbers[0]);
      rootNode.addNext(numbers, 1, doCombine);

      const leaves = rootNode.findLeafNodes();

      for (let i = 0; i < leaves.length; i++) {
        const leafNode = leaves[i];
        if (leafNode === answer) {
          calculatedAnswer += answer;
          break;
        }
      }
    });
    return calculatedAnswer.toString()
  }
}

class Node {
  operation: string;
  value: number;
  children: Node[];

  constructor (value: number, operation: string = '') {
    this.children = [];
    this.value = value;
    this.operation = operation;
  }

  addNext (numbers: number[], index: number, doCombine: boolean = false): void {
    if (index >= numbers.length) return;

    const addNode = new Node(this.value + numbers[index], '+');
    const multiplyNode = new Node(this.value * numbers[index], '*');

    this.children.push(addNode, multiplyNode);

    if (doCombine) {
      const combineNode = new Node(parseInt(this.value.toString() + numbers[index].toString()), '||');
      this.children.push(combineNode);
      combineNode.addNext(numbers, index + 1, true);
    }

    addNode.addNext(numbers, index + 1, doCombine);
    multiplyNode.addNext(numbers, index + 1, doCombine);
  }

  findLeafNodes (): number[] {
    const leafNodes: number[] = [];
    const stack: Node[] = [this];

    while (stack.length > 0) {
      const currentNode = stack.pop()!;
      if (currentNode.children.length === 0) {
        leafNodes.push(currentNode.value);
      } else {
        for (let i = currentNode.children.length - 1; i >= 0; i--) {
          stack.push(currentNode.children[i]);
        }
      }
    }

    return leafNodes;
  }
}

export default new Day7()
