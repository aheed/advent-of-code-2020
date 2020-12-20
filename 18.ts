import { notEqual } from "assert";
import { getInputRows } from "./utils/utils";


interface Node {
    //subnodes: Node[];
}

class Operator implements Node {
    constructor(op: string) {
        this.op = op;
    }
    op: string;
    //subnodes: Node[] = [];
}

interface Operand extends Node{
    getValue(): number;
}

class Literal implements Operand {

    constructor(val: number) {
        this.numVal = val;
    }

    getValue = (): number => this.numVal;

    numVal: number;

    //subnodes: Node[] = [];
}

const evaluate = (nodes: Node[]): number => {
    //console.log(nodes);
    if (nodes.length == 0) {
        return 0;
    }

    if (nodes.length == 1) {
        return (nodes[0] as Operand).getValue();
    }

    let oper = nodes[1] as Operator;
    let operand1 = nodes[0] as Operand;
    let operand2 = nodes[2] as Operand;
    let operationResult: number = 0;
    if (oper.op == '+') {
        operationResult = operand1.getValue() + operand2.getValue();
    }
    else if (oper.op == '*') {
        operationResult = operand1.getValue() * operand2.getValue();
    }
    return evaluate([new Literal(operationResult), ...nodes.slice(3)]);
}

const evaluate2 = (nodes: Node[]): number => {
    //console.log(nodes);
    if (nodes.length == 0) {
        return 0;
    }

    if (nodes.length == 1) {
        return (nodes[0] as Operand).getValue();
    }

    //console.log(nodes);

    let startIndex = nodes.findIndex(node => node instanceof Operator && node.op == '+') - 1;
    // if (startIndex >= 0) {
    //     console.log('startIndex:', startIndex);
    // }

    if (startIndex < 0) {
        startIndex = 0;
    }  

    let oper = nodes[startIndex + 1] as Operator;
    let operand1 = nodes[startIndex] as Operand;
    let operand2 = nodes[startIndex + 2] as Operand;

    let operationResult: number = 0;
    if (oper.op == '+') {
        operationResult = operand1.getValue() + operand2.getValue();
    }
    else if (oper.op == '*') {
        operationResult = operand1.getValue() * operand2.getValue();
    }
    //let preSlice: Node[] = startIndex > 0 ? nodes.slice(0, startIndex) : [];
    let preSlice: Node[] = nodes.slice(0, startIndex);
    return evaluate2([...preSlice, new Literal(operationResult), ...nodes.slice(startIndex + 3)]);
}

// enum ParseState {
//     Initial = 1,

// }

class Expression implements Operand {
    constructor(expr: string, evalFun: (nodes: Node[]) => number) {
        this.expr = expr;
        this.evalFun = evalFun;
    }

    evalFun: (nodes: Node[]) => number;
    
    private parse = (): Node[] => {

        let pos = 0;
        let ret: Node[] = [];

        while (pos < this.expr.length) {
            let nextChar = this.expr.substr(pos, 1);
            let newNode: Node;

            if (nextChar == ' ') {
                ++pos;
                continue;
            }
            else if (nextChar == '(') {
                let parenthesisCount = 1;
                let exprStart = pos + 1;
                while(parenthesisCount > 0) {
                    ++pos;
                    let nextChar = this.expr.substr(pos, 1);
                    if (nextChar == '(') {
                        ++parenthesisCount;
                    }
                    else if (nextChar == ')') {
                        --parenthesisCount;
                    }
                }
                newNode = new Expression(this.expr.substring(exprStart, pos), this.evalFun);
            }
            else if (nextChar == '+' ||  nextChar == '*') {
                newNode = new Operator(nextChar);
            }
            else {
                newNode = new Literal(parseInt(nextChar));
            }

            if (!!newNode) {
                ret.push(newNode);
            }

            ++pos;
        }

        return ret;
    }

    getValue = (): number => {
        let nodes = this.parse();
        return this.evalFun(nodes);
    }

    expr: string;

    //subnodes: Node[] = [];
}

export const day18 = () => {

    let rows = getInputRows('./input/18.txt');

    // Part 1
    let exprs: Node[] = rows.map(row => new Expression(row, evaluate));

    let exprResults = exprs.map(e => evaluate([e]));
    //console.log(exprResults);

    let sum = exprResults.reduce((prev, curr) => prev + curr);
    console.log(sum);

    
    // Part 2
    let exprs2: Node[] = rows.map(row => new Expression(row, evaluate2));

    let exprResults2 = exprs2.map(e => evaluate2([e]));
    //console.log(exprResults2);

    let sum2 = exprResults2.reduce((prev, curr) => prev + curr);
    console.log(sum2);
}
