import { getInputRows } from "./utils/utils";

const toNumber = (bincode: string): number => {
    let bin = bincode.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1');
    return parseInt(bin, 2);
}

const calcId = (row:number, col:number): number => row * 8 + col;

const codeToId = (code: string): number => {
    let rowCode = code.slice(0, 7);
    let colCode = code.slice(7, 10);
    // console.log(code);
    // console.log(rowCode);
    // console.log(colCode);

    let row = toNumber(rowCode);
    let col = toNumber(colCode);
    // console.log(row);
    // console.log(col);

    return calcId(row, col);
}

export const day5 = () => {
    let rows = getInputRows('./input/5.txt');
    
    // console.log(rows);
    // console.log(codeToId(rows[0]));

    let res = rows.map(r => codeToId(r)).reduce((prev, curr) => curr > prev ? curr : prev);
    console.log(res);
}

export const day5b = () => {
    let rows = getInputRows('./input/5.txt');
    
    let ids = rows.map(r => codeToId(r));

    let row = 0;
    let col = 0;

    
    let candidates: number[] = [];
    for (row = 0; row < 128; row++)
    {
        for (col = 0; col < 8; col++)
        {
            let id = calcId(row, col);
            if (!ids.includes(id)) {
                candidates.push(id);
            }
        }
    }

    candidates.forEach(id => {
        if (ids.includes(id - 1) && ids.includes(id + 1)) {
            console.log(id);
            return;
        }
    });
}
