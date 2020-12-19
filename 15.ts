
export const day15 = () => {
    let input = [0,12,6,13,20,1,17];
    //let input = [2,1,3];
    //let input = [0,3,6];
    let spokenNums = new Map<number, number>();
    let speakTime = 0;
    let lastNum = 0;

    while (speakTime < 2020) {
    
        
        let newNum = 0;
        if (speakTime < input.length) {
            newNum = input[speakTime];
        }
        else if (spokenNums.has(lastNum)) {
            newNum = speakTime - spokenNums.get(lastNum)!;
        }
        else {
            newNum = 0;
        }

        //console.log(speakTime, lastNum, newNum, spokenNums.get(lastNum));
        if (speakTime > 0) {
            spokenNums.set(lastNum, speakTime);
        } 

        ++speakTime;
        lastNum = newNum;
    }

    console.log(lastNum);

}

