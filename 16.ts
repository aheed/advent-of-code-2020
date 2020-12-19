import { getInputRows } from "./utils/utils";

class RuleRange {
    constructor(r: string) {
        let limits = r.split('-');
        this.minval = parseInt(limits[0]);
        this.maxval = parseInt(limits[1]);
    }
    minval: number;
    maxval: number;
}

class Rule {
    constructor(row: string) {
        let parts = row.split(':');
        this.label = parts[0];
        let rangesStrings = parts[1].trim().split(' or ');
        this.ranges =  rangesStrings.map(s => new RuleRange(s));
        //console.log(this.ranges);
    }

    isValid = (val: number): boolean => this.ranges.map(range => val >= range.minval && val <= range.maxval).reduce((prev, curr) => prev || curr);

    label: string;
    ranges: RuleRange[];
}

export const day16 = () => {

    let rows = getInputRows('./input/16.txt');

    let nofRules = rows.findIndex(row => row === '');
    //console.log(nofRules);

    let ruleRows = rows.slice(0, nofRules);
    //console.log(ruleRows);

    let myTicketRow = rows[nofRules + 2];
    //console.log(myTicketRow);

    let ticketsRows = rows.slice(nofRules + 5);
    //console.log(ticketsRows);
    //console.log(ticketsRows[ticketsRows.length-1]);
    
    let rules = ruleRows.map(row => new Rule(row));
    //console.log(rules);

    let tickets = ticketsRows.map(row => row.trim().split(',').map(s => parseInt(s)));
    //console.log(tickets);


    /////////////
    let v = 700;
    let z = rules[0].isValid(v);
    console.log(rules[0], v, z);
    v = 45556667;
    z = rules[0].isValid(v);
    console.log(rules[0], v, z);
    v = 901;
    z = rules[5].isValid(v);
    console.log(rules[5], v, z);

    let errorRate = 0;

    tickets.forEach(ticket => {
        //console.log('***********');
        ticket.forEach(ticketValue => {
            let violatedRules = rules.filter(rule => !rule.isValid(ticketValue));
            if (violatedRules.length == rules.length) {
                errorRate += ticketValue;
                console.log(ticketValue, errorRate);
            }
            //console.log(ticketValue);
        });
    });

    console.log(errorRate);
}