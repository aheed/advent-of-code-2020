import { getInputRows } from "./utils/utils";

export const day19 = () => {

    let rows = getInputRows('./input/19b.txt');

    let nofRules = rows.findIndex(row => row === '');
    //console.log(nofRules);

    let ruleRows = rows.slice(0, nofRules);
    //console.log(ruleRows);

    let expressionRows = rows.slice(nofRules + 1);
    //console.log(expressionRows);
    
    let rulesNoAndSpecs = ruleRows.map(row => row.split(':'));
    //console.log(rulesNoAndSpecs);

    let ruleMap = new Map<string, Rule>();
    rulesNoAndSpecs.forEach( numberAndSpec => {
        ruleMap.set(numberAndSpec[0] , new Rule(numberAndSpec[1].replace(/\"/g, '')));
    });
    //console.log(ruleMap);


    console.log('');
    console.log('');

    let zeroRule = ruleMap.get('0') as Rule;
    let results = expressionRows.map(expr => zeroRule.getPostStringsAfterMatch(expr, ruleMap));
    let resultsStricter = results.map(res => res[0] && res[1].size == 0)
    // console.log(results);
    // console.log(resultsStricter);
    let sum = resultsStricter.map<number>(r => r ? 1 : 0).reduce((prev, curr) => prev + curr);
    console.log(sum);
}

class Rule {
    constructor(spec: string) {
        let seqSpecs = spec.split('|');
        this.sequences = seqSpecs.map(seqSpec => seqSpec.trim().split(' '));
        //console.log(this.sequences);
    }
    sequences: string[][];

    getPostStringsAfterMatch = (expression: string, ruleMap: Map<string, Rule>): [boolean, Set<string>] => {
        let ret = new Set<string>();

        if (expression =='') {
            console.log("should not happen???");
            return [true, ret];
        }

        let s00 = this.sequences[0][0];
        let e0 = expression.substr(0, 1);
        if (s00 == 'a' || s00 == 'b') {
            if (s00 == e0) {
                if (expression.length > 1) {
                    ret.add(expression.substr(1));
                }
                return [true, ret];
            }
            else {
                return [false, new Set<string>()];
            }
        }

        let anySeqOk = false;
        this.sequences.forEach(sequence => {
            let [ok, resultSet] = Rule.getPostStringsAfterSequenceMatch(new Set([expression]), sequence, ruleMap);
            if (ok) {
                anySeqOk = true;
                ret = new Set([...ret, ...resultSet]);
            }
        });

        return [anySeqOk, ret];
    }

    static getPostStringsAfterSequenceMatch = (expressions: Set<string>, sequence: string[], ruleMap: Map<string, Rule>): [boolean, Set<string>] => {
        if (sequence.length == 0) {
            return [true, expressions];
        }

        if (expressions.size == 0) {
            console.log("odd!!!");
            return [true, expressions];
        }

        let sequenceHeadRule = ruleMap.get(sequence[0]);

        let sequenceHeadResults = [...expressions].map(expression => sequenceHeadRule!.getPostStringsAfterMatch(expression, ruleMap));
        let sequenceHeadResult = sequenceHeadResults.reduce((prev, curr) => [prev[0] || curr[0], curr[0] ? new Set([...prev[1], ...curr[1]]) : prev[1]]);

        if (!sequenceHeadResult[0]) {
            return [false, new Set<string>()];
        }
        
        if (sequence.length == 1) {
            return sequenceHeadResult;
        }

        let remainingSequence = sequence.slice(1);
        return Rule.getPostStringsAfterSequenceMatch(sequenceHeadResult[1], remainingSequence, ruleMap);
    }


}
