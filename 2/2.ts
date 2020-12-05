import { readFileSync } from 'fs';


class PwdPolicy {    
    minNum: number = 0;
    maxNum: number = 0;
    subString: string = "";
};

const StringToPolicy = (inp: string): PwdPolicy => {
    let [limits, subString] = inp.split(" ");
    let ret = new PwdPolicy;
    [ret.minNum, ret.maxNum] = limits.split("-").map(c => parseInt(c));
    ret.subString = subString.trim();
    return ret;
}

const SumNumbers = (nums: number[]) : number => nums.reduce((prev, curr) => prev + curr);

const IsGoodPwd =  (policy: PwdPolicy, pwd: string) : boolean => {
    let pwdChars = pwd.split("");
    let pwdMatch = pwdChars.map<number>(c => c === policy.subString ? 1 : 0);
    let num = SumNumbers(pwdMatch);
    return num >= policy.minNum && num <= policy.maxNum;
}

const IsGoodPwdb =  (policy: PwdPolicy, pwd: string) : boolean => {
    let pwdChars = pwd.split("");
    let num = pwd.charAt(policy.minNum - 1) === policy.subString ? 1 : 0;
    num += pwd.charAt(policy.maxNum - 1) === policy.subString ? 1 : 0;
    return num == 1;
}

const IsGoodEntry = (entry: string, evalFun: (policy: PwdPolicy, pwd: string) => boolean): boolean => {
    let [policyStr, pwd] = entry.split(":").map(s => s.trim());
    let policy = StringToPolicy(policyStr);

    let ret = evalFun(policy, pwd);
    //console.log(entry, ret);
    return ret;
}

const GetInputRows = () : string[] => {
    const intext = readFileSync('./input/2.txt', 'utf-8');
    return intext.split("\n");
}

const IsGoodEntryCurried = (evalFun: (policy: PwdPolicy, pwd: string) => boolean) => (entry: string): boolean => IsGoodEntry(entry, evalFun);

const SumGoodEntries = (rows: string[], criterion: (entry: string) => boolean): number => 
    rows.map<number>(row => criterion(row) ? 1 : 0).reduce((prev, curr) => prev + curr);

export const day2 = () => {
    let rows = GetInputRows();
    let pwdEvalFun = IsGoodEntryCurried(IsGoodPwd);
    let answer = SumGoodEntries(rows, pwdEvalFun);
    console.log(answer);
}

export const day2b = () => console.log(SumGoodEntries(GetInputRows(), IsGoodEntryCurried(IsGoodPwdb)));
