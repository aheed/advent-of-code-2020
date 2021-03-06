import { getInputText } from "../utils/utils"


export const  day4 = () => {
    let input = getInputText('./input/4.txt');
    let entries = input.split("\n\n");
    //let re = /\n/;
    let entries2 = entries.map(entry => entry.replace(/\n/g, " "))
    .map(entry => entry.split(" "))
    .map(entry => entry.map(post => post.split(":")[0]))
    .filter(entry => 
        entry.includes('byr') &&
        entry.includes('iyr') &&
        entry.includes('eyr') &&
        entry.includes('hgt') &&
        entry.includes('hcl') &&
        entry.includes('ecl') &&
        entry.includes('pid'));
    // console.log(entries2[0]);
    // console.log(entries2.slice(0, 3));
    console.log(entries2.length);
}

const parseIntSafely = (inp?: string): number => parseInt(inp ?? "0");


const validYear = (minYear: number, maxYear: number, byr?: string) : boolean => {
    let year = parseIntSafely(byr);
    return year >= minYear && year <= maxYear;
};

const validByr = (byr?: string) : boolean => validYear(1920, 2002, byr);

const validIyr = (inp?: string) : boolean => validYear(2010, 2020, inp);

const validEyr = (inp?: string) : boolean => validYear(2020, 2030, inp);

const validHgt = (inp?: string) : boolean => {
    if (!inp) {
        return false;
    }

    let hgtMatch = inp.match(/(?<quantity>\d+)(?<unit>cm|in)/);
    
//    console.log(inp);
//    console.log(hgtMatch);

    let q = hgtMatch?.groups?.quantity ?? 0;
    let u = hgtMatch?.groups?.unit ?? 'cm';
//    console.log(q);
//    console.log(u);

    return (u == 'cm' && (q >= 150 && q <= 193)) || 
           (u == 'in' && (q >= 59  && q <= 76));
};

const validHcl = (inp?: string) : boolean => {
    if (!inp) {
        return false;
    }

    let hclMatch = inp.match(/#(\d|[a-f]){6}/);
    
    // console.log("-");
    // console.log(inp);
    // console.log(hclMatch);

    return !!hclMatch;

};

const validEcl = (inp?: string) : boolean => {
    if (!inp) {
        return false;
    }

    let eclMatch = inp.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/);
    
    // console.log("-");
    // console.log(inp);
    // console.log(eclMatch);

    return !!eclMatch;

};

const validPid  = (inp?: string) : boolean => {
    if (!inp) {
        return false;
    }

    let pidMatch = inp.match(/^\d{9}$/);
    
    // console.log("-");
    // console.log(inp);
    // console.log(pidMatch);

    return !!pidMatch;

};


export const  day4b = () => {
    let input = getInputText('./input/4.txt');
    let entries = input.split("\n\n");
    //let re = /\n/;
    let entries2 = entries.map(entry => entry.replace(/\n/g, " "))
    .map(entry => entry.split(" "))
    .map(entry => entry.map<[string, string]>(post => post.split(":") as [string, string]))
    .map(entry => new Map(entry))
    .filter(entry => 
        validByr(entry.get('byr')) &&
        validIyr(entry.get('iyr')) &&
        validEyr(entry.get('eyr')) &&
        validHgt(entry.get('hgt')) &&
        validHcl(entry.get('hcl')) &&
        validEcl(entry.get('ecl')) &&
        validPid(entry.get('pid')));
    //console.log(entries2.slice(0, 3));
    console.log(entries2.length);
}
