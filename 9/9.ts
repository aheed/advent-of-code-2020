import { getInputRows } from "../utils/utils";


const isNumberValid = (prevNumbers: number[], target: number): boolean => {
    for (let n1=0; n1<prevNumbers.length; ++n1)
    {
        for (let n2=0; n2<prevNumbers.length; ++n2)
        {
            if ((prevNumbers[n1] != prevNumbers[n2]) && (prevNumbers[n1] + prevNumbers[n2]) === target)
            {
                //console.log(prevNumbers[n1], prevNumbers[n2], target);
                return true;
            }
        }    
    }

    return false;
}


export const day9 = () => {
    let rows = getInputRows('./input/9.txt');
    //let rows = getInputRows('./input/9ex.txt');
    //let preambleLen = 5;
    let preambleLen = 25;

    let numbers = rows.map(row => parseInt(row.trim()));
    let p1Number = 0;

    for (let targetIndex=preambleLen; targetIndex<numbers.length; ++targetIndex) {
        let prevs = numbers.slice(targetIndex - preambleLen, targetIndex);
        let target = numbers[targetIndex];
        if (!isNumberValid(prevs, target)) {
            console.log(target);
            p1Number = target;
            break;
        }
    }

    for (let startIndex=0; startIndex < numbers.length; ++startIndex) {
        let sum = 0;
        let index = startIndex;
        while (sum < p1Number && index < numbers.length) {
            sum += numbers[index];
            index += 1;
        }

        if (sum === p1Number) {
            console.log("got it", startIndex, index);

            let min = numbers.slice(startIndex, index-1).reduce((prev, curr) => curr < prev ? curr : prev);
            let max = numbers.slice(startIndex, index-1).reduce((prev, curr) => curr > prev ? curr : prev);

            console.log(min, max);
            console.log(min + max);
            break;
        }
    }

}