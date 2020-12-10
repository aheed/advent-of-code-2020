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
}

class Processor {

    constructor() {
        this.reset();
    }

    acc: number = 0;
    pct: number = 0;

    reset = () => {
        this.acc = 0;
        this.pct = 0;
    }

    singleStep = (prog: AdventProgram): void => {
        let op = prog.ops[this.pct];
        if (op.operator === AdventOperator.nop) {
            this.pct++;
        }
        else if (op.operator === AdventOperator.acc) {
            this.acc += op.arg;
            this.pct++;
        }
        else if (op.operator === AdventOperator.jmp) {
            this.pct += op.arg;
        }
        else {
            console.warn('no such op');
            console.warn(op);
        }
    }

    runUntilLoopDetectedOrFinished = (prog: AdventProgram): boolean => {
        this.reset();
        let hasRunBefore = prog.ops.map(o => false);
        while (true) {
            if (this.pct == prog.ops.length) {
                return true;
            }

            if (hasRunBefore[this.pct]) {
                return false;
            }

            hasRunBefore[this.pct] = true;
            this.singleStep(prog);
            //console.log(this.acc, this.pct);
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
    proc.runUntilLoopDetectedOrFinished(prog);
    console.log(proc.acc);
}

export const day8b = () => {
    let prog = readProg('./input/8.txt');
    let proc = new Processor();
    
    let i = 0;
    for (i = 0; i < prog.ops.length; i++) {
        let oldOper = prog.ops[i].operator;

        if (prog.ops[i].operator == AdventOperator.nop) {
            prog.ops[i].operator = AdventOperator.jmp;
        }
        else if (prog.ops[i].operator == AdventOperator.jmp)
        {
            prog.ops[i].operator = AdventOperator.nop;
        }
        else {
            continue;
        }

        
        let success = proc.runUntilLoopDetectedOrFinished(prog);
        if (success)
        {
            console.log(proc.acc);
            break;
        }
        
        prog.ops[i].operator = oldOper;
    }

}