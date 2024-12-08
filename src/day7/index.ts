import { Day } from '../day'

class Day7 extends Day {
  constructor () {
    super(7)
    this.expectedResultPart1 = '?'
    this.expectedResultPart2 = '?'
  }

  solveForPartOne (input: string): string {
    const equationList = input.split('\n');
    let calculatedAnswer = 0;

    equationList.forEach(equation => {
      const [answerString, equationString] = equation.split(': ');
      const answer = parseInt(answerString)
      const numbers = equationString.split(' ').map(Number);

      const rootNode = new Node(numbers[0]);
      rootNode.addNext(numbers, 1);

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

  solveForPartTwo (input: string): string {
    return ''
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

  addNext (numbers: number[], index: number) {
    if (index >= numbers.length) return;

    const addNode = new Node(this.value + numbers[index], '+');
    const multiplyNode = new Node(this.value * numbers[index], '*');

    this.children.push(addNode, multiplyNode);

    addNode.addNext(numbers, index + 1);
    multiplyNode.addNext(numbers, index + 1);
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
