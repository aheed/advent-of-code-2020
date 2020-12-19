import { getInputRows } from "./utils/utils";

type Op = 'mask' | 'mem';
class Instruction {
    constructor(operator: Op, addr:number, operand: string) {
        this.operator = operator;
        this.addr = addr;

        if (operator === 'mask') {
            let digits = operand.split('');
            this.orMask = digits.map(d => d === '1' ? d : '0').map(d => parseInt(d));
            this.andMask = digits.map(d => d === '0' ? d : '1').map(d => parseInt(d));
            this.floatingMask = digits.map(d => d === 'X' ? 1 : 0);
        }
        else {
            this.memOperand = parseInt(operand);
        }
        this.operand = operand;
    }

    operator: Op;
    addr: number;
    memOperand?: number;
    orMask?: number[];
    andMask?: number[];
    floatingMask?: number[];
    operand: string;
}

export const day14b = () => {

    let rows = getInputRows('./input/14.txt');
    

    let instructions = rows.map(row => {
        let [operation, operand] = row.split(' = ');

        let match = operation.match(/(?<operation>mem|mask)(\[(?<addr>\d+)\])*/ );

        return new Instruction(match?.groups?.operation as Op, parseInt(match?.groups?.addr ?? '0'), operand);

    });

    let memory = new Map<number, number>();
    let orMask: number[] = [];
    //let andMask: number[] = [];
    let floatingMask: number[] = [];

    console.log('');
    instructions.forEach(instruction => {
        if (instruction.operator === 'mask') {
            orMask = instruction.orMask as number[];
            //andMask = instruction.andMask as number[];
            floatingMask = instruction.floatingMask as number[];
        }
        else {
            let nominalAddrDigits =  instruction.addr.toString(2).split('').map(d => parseInt(d));
            while (nominalAddrDigits.length < orMask.length) {
                nominalAddrDigits = [0, ...nominalAddrDigits];
            }
            nominalAddrDigits = nominalAddrDigits.map( (d, index) => d | orMask[index]);

            let allAddressesDigits: number[][] = [nominalAddrDigits];

            floatingMask.forEach( (digit, ix, arr) => {
                if (!digit) {
                    return [];
                }

                let r1: number[][] = [];
                let tmp = [...allAddressesDigits];
                tmp.forEach(b => {
                    let a = [...b];
                    a[ix] = 0;
                    r1.push(a);
                    a = [...b];
                    a[ix] = 1;
                    r1.push(a);
                });

                allAddressesDigits = r1;
            });

            allAddressesDigits.forEach(digits => {
                let addr = parseInt(digits.join(''), 2);
                memory.set(addr, instruction.memOperand as number);
            });

        }
    });

    let res = Array.from(memory.values()).reduce((prev, curr) => prev + curr);
    console.log(res);
}

export const day14 = () => {

    let rows = getInputRows('./input/14.txt');
    
    //console.log(rows[0]);

    let instructions = rows.map(row => {
        let [operation, operand] = row.split(' = ');

        let match = operation.match(/(?<operation>mem|mask)(\[(?<addr>\d+)\])*/ );

        return new Instruction(match?.groups?.operation as Op, parseInt(match?.groups?.addr ?? '0'), operand);

    });

    // console.log(instructions[0]);
    // console.log(instructions[1]);

    let memory = new Map<number, number>();
    let orMask: number[] = [];
    let andMask: number[] = [];

    console.log('');
    instructions.forEach(instruction => {
        if (instruction.operator === 'mask') {
            orMask = instruction.orMask as number[];
            andMask = instruction.andMask as number[];
        }
        else {
            let operandDigits =  (instruction?.memOperand as number).toString(2).split('').map(d => parseInt(d));
            while (operandDigits.length < orMask.length) {
                operandDigits = [0, ...operandDigits];
            }
            operandDigits = operandDigits.map( (d, index) => d & andMask[index]);
            operandDigits = operandDigits.map( (d, index) => d | orMask[index]);
            let val = parseInt(operandDigits.join(''), 2);
            memory.set(instruction.addr, val);
        }
    });

    // console.log('');
    // console.log(memory);

    let res = Array.from(memory.values()).reduce((prev, curr) => prev + curr);
    console.log(res);
}
