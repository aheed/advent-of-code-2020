import { constants } from "buffer";
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
    position?: number;
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
    // let v = 700;
    // let z = rules[0].isValid(v);
    // console.log(rules[0], v, z);
    // v = 45556667;
    // z = rules[0].isValid(v);
    // console.log(rules[0], v, z);
    // v = 901;
    // z = rules[5].isValid(v);
    // console.log(rules[5], v, z);

    let errorRate = 0;

    tickets.forEach(ticket => {
        //console.log('***********');
        ticket.forEach(ticketValue => {
            let violatedRules = rules.filter(rule => !rule.isValid(ticketValue));
            if (violatedRules.length == rules.length) {
                errorRate += ticketValue;
                //console.log(ticketValue, errorRate);
            }
            //console.log(ticketValue);
        });
    });

    console.log(errorRate);


    // Part 2
    //////////////////////////

    let validTickets = tickets.filter(ticket => {
        let errorRate = 0;
        ticket.forEach(ticketValue => {
            let violatedRules = rules.filter(rule => !rule.isValid(ticketValue));
            if (violatedRules.length == rules.length) {
                errorRate += ticketValue;
                //console.log(ticketValue, errorRate);
            }
            //console.log(ticketValue);
        });
        return errorRate == 0;
    });
    //console.log(validTickets);
    //console.log(tickets.length, validTickets.length);


    let knownPositions = new Map<number, Rule>();
    let lastNofKnownPositions = -1;
    //while (knownPositions.size < rules.length)
    while (knownPositions.size != lastNofKnownPositions)
    {
        lastNofKnownPositions = knownPositions.size;
        //console.log('   ', knownPositions.size);
        for (let position=0; position<rules.length; ++position) {
            let candidateRules = rules.filter(rule => {
                let values = validTickets.map(ticket => ticket[position]);
                let invalidValues = values.filter(val => !rule.isValid(val));
                //console.log(rule);
                //console.log(values);
                //console.log(invalidValues);
                return rule.position == undefined && invalidValues.length == 0;                
            });
            //console.log(position, 'candidates ', candidateRules.length);
            if (candidateRules.length == 1) {
                //console.log("got a match!");
                //console.log(candidateRules[0].position, position);
                candidateRules[0].position =  position;
                knownPositions.set(position, candidateRules[0]);
                //console.log(candidateRules[0].position, position);
            }
        }
    }

    //console.log(rules);

    let departureRules = rules.filter(rule => rule.label.includes('departure'));
    //console.log(departureRules);

    let myTicket = myTicketRow.trim().split(',').map(s => parseInt(s));
    let myTicketFields = departureRules.map(rule => myTicket[rule.position as number]);
    //console.log(myTicketFields);

    let res = myTicketFields.reduce((prev, curr) => prev * curr);
    console.log(res);
}