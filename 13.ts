import { getInputRows } from "./utils/utils";

export const day13 = () => {

    let rows = getInputRows('./input/13.txt');
    
    //console.log(rows);

    let currTime = parseInt(rows[0]);
    console.log(currTime);

    let res = rows[1]
    .split(',')
    .filter(m => m != 'x')
    .map(m => parseInt(m))
    .map(m => [m, m - currTime  % m])
    .reduce((prev, curr) => curr[1] < prev[1] ? curr : prev);
    console.log(res);
    console.log(res[0] * res[1]);
}
