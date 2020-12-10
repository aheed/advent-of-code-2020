import { getInputRows } from "../utils/utils";

enum AdventOperator {
    nop = 1,
    acc,
    jmp
}

class AdventInstruction {
    constructor(op: AdventOperator, arg: number) {
        this.operator = op;
        this.arg = arg;
    }
    operator: AdventOperator;
    arg: number;
}

class AdventProgram {
    ops: AdventInstruction[] = [];
    pct: number = 0;

    getNextInstruction = (): AdventInstruction => this.ops[this.pct];
}

class Processor {
    constructor() {
        this.acc = 0;
    }
    acc: number;

    singleStep = (prog: AdventProgram): void => {
        let op = prog.getNextInstruction();
        if (op.operator === AdventOperator.nop) {
            prog.pct++;
        }
        else if (op.operator === AdventOperator.acc) {
            this.acc += op.arg;
            prog.pct++;
        }
        else if (op.operator === AdventOperator.jmp) {
            prog.pct += op.arg;
        }
        else {
            console.warn('no such op');
            console.warn(op);
        }
    }

    runUntilLoopDetected = (prog: AdventProgram): void => {
        let hasRunBefore = prog.ops.map(o => false);
        while (!hasRunBefore[prog.pct]) {
            hasRunBefore[prog.pct] = true;
            this.singleStep(prog);
        }
    }

}

const parseInstruction = (row: string): AdventInstruction => {
    let parts = row.trim().split(' ');
    let instr = new AdventInstruction((<any>AdventOperator)[parts[0]], parseInt(parts[1]));
    return instr;
}

const readProg = (fileName: string): AdventProgram => {
    let rows = getInputRows(fileName);
    let ret = new AdventProgram;

    ret.ops = rows.map(row => parseInstruction(row));
    return ret;
}

export const day8 = () => {
    let prog = readProg('./input/8.txt');
    //console.log(prog);
    let proc = new Processor();
    proc.runUntilLoopDetected(prog);
    console.log(proc.acc);
}