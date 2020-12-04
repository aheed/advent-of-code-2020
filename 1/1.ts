import { readFileSync } from 'fs';
import { start } from 'repl';


export const day1 = () => {
    const intext = readFileSync('./input/1.txt', 'utf-8');

    const rows = intext.split("\n");
    const in_numbers = rows.map(r => parseInt(r));

    while (in_numbers.length >= 2) {
        const startNum =  in_numbers.pop() ?? 0;


        in_numbers.forEach(element => {
            if (startNum + element == 2020) {
                console.log("Got it!");
                console.log(startNum);
                console.log(element);
                console.log(startNum * element);
            }
        });
    }

    return "no solution found!";
}

const findSumElems = (sum: number, inp: number[]) : [number, number] => {

    while (inp.length >= 2) {
        const startNum =  inp.pop() ?? 0;

        let secondTerm = inp.find(element => {
            return (startNum + element == sum);
        });

        if (secondTerm) {
            return [startNum, secondTerm];
        } 
    }

    return [-1, -1];
}

export const day1alt = () => {
    const intext = readFileSync('./input/1.txt', 'utf-8');

    const rows = intext.split("\n");
    const in_numbers = rows.map(r => parseInt(r));

    const result = findSumElems(2020, in_numbers);

    if (result[0] == -1) {
        console.log("no solution found!");
    }
    else {
        console.log(result);
        console.log(result.reduce((prev, curr) => prev * curr));
    }
}

export const day1b = () => {
    const intext = readFileSync('./input/1.txt', 'utf-8');

    const rows = intext.split("\n");
    const in_numbers = rows.map(r => parseInt(r));

    console.log("day1b");

    while (in_numbers.length >= 3) {
        const startNum = in_numbers.pop() ?? 0;
        const numbers_tail = [...in_numbers];

        let terms = findSumElems(2020 - startNum, numbers_tail);

        if (terms[0] != -1) {
            console.log("found a solution!");
            terms.push(startNum);
            console.log(terms);
            console.log(terms.reduce((prev, curr) => prev * curr));
            return;
        }        
    }
 
    console.log("no solution found!");
 
}