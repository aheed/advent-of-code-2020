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

/*export const day1alt = () => {
    const intext = readFileSync('./input/1.txt', 'utf-8');

    const rows = intext.split("\n");
    const in_numbers = rows.map(r => parseInt(r));

    in_numbers.reduce(startNum => {
        //Todo
    })

    return "no solution found!";
}*/
