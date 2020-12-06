import { getInputText } from "../utils/utils";

function union<T>(setA:Set<T>, setB:Set<T>) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

function intersection<T>(setA:Set<T>, setB:Set<T>): Set<T> {
    let _intersection = new Set<T>()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

const getQCount = (group:string): number => {
    let members = group.split('\n');
    //console.log(members);

    let memSets = members.map(member => new Set(member));
    //console.log(memSets);

    let groupSet = memSets.reduce((prev, curr) => union(prev, curr));
    // console.log(groupSet);
    //console.log(groupSet.size);

    return groupSet.size;
}

const getQCountEx = (group:string, setOperation:(setA:Set<string>, setB:Set<string>) => Set<string>): number => {
    let members = group.split('\n');
    //console.log(members);

    let memSets = members.map(member => new Set(member));
    //console.log(memSets);

    let groupSet = memSets.reduce(setOperation);
    // console.log(groupSet);
    //console.log(groupSet.size);

    return groupSet.size;
}

// export const day6 = () => {
//     let input = getInputText('./input/6.txt');
//     let groups = input.split("\n\n");

//     let res = groups.map(g => getQCount(g)).reduce((prev, curr) => prev + curr);
//     console.log(res);
//     //getQCount(groups[0]);
// }

const day6Solution = (setOperation:(setA:Set<string>, setB:Set<string>) => Set<string>) => {
    let input = getInputText('./input/6.txt');
    let groups = input.split("\n\n");

    let res = groups.map(g => getQCountEx(g, setOperation)).reduce((prev, curr) => prev + curr);
    console.log(res);
}

export const day6 = () => day6Solution(union);

export const day6b = () => day6Solution(intersection);
