import { getInputRows } from "../utils/utils";


export const day10 = () => {
    let rows = getInputRows('./input/10.txt');
    let numbers = rows.map(row => parseInt(row.trim()));

    let seq = numbers.sort((a,b) => a - b);
    let builtInJolts = seq[seq.length - 1] + 3;
    seq = [...seq, builtInJolts];

    let diffs = seq.map((jolts, index, seq) => jolts - (index == 0 ? 0 : seq[index - 1]));
    let answer = diffs.filter(diff => diff == 1).length * diffs.filter(diff => diff == 3).length;

    //console.log(seq);
    //console.log(diffs);
    console.log(answer);

    seq = [0, ...seq];

    let cache = seq.map(j => 0);

    let combos = seq.reduce((prev, curr, index, arr) => {
        let ret = 0;
        if (index == 0) {
            ret = 1;
        }
        else {
            for (let prevIndex = (index - 1); prevIndex >= 0 && (curr - arr[prevIndex]) <= 3; --prevIndex) {
                ret += cache[prevIndex];
            }
        }
        cache[index] = ret;
        return ret;
    }, 0);

    console.log('');
    //console.log(cache);
    console.log(combos);
}