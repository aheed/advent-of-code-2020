import { off } from "process";
import { getInputRows } from "./utils/utils";

export const day13 = () => {

    let rows = getInputRows('./input/13.txt');
    
    //console.log(rows);

    let currTime = parseInt(rows[0]);
    //console.log(currTime);

    let res = rows[1]
    .split(',')
    .filter(m => m != 'x')
    .map(m => parseInt(m))
    .map(m => [m, m - currTime  % m])
    .reduce((prev, curr) => curr[1] < prev[1] ? curr : prev);
    //console.log(res);
    console.log(res[0] * res[1]);
}


class Bus {
    constructor(nr: number, offset:number) {
        this.nr = nr;
        this.offset = offset;
    }
    nr: number;
    offset: number;
}

export const day13b = () => {

    let rows = getInputRows('./input/13.txt');

    let currTime = 0;

    let buses = rows[1]
    .split(',')
    .map((bus: string, index:number): [string, number] => [bus, index])
    .filter(bus => bus[0] != 'x')
    .map(bus => new Bus(parseInt(bus[0]), bus[1]));

    //console.log(buses);

    let increment = 1;
    let tstamp = buses[0].nr;

    buses.forEach(bus => {
        
        while ( (tstamp + bus.offset) % bus.nr != 0)
        {
            tstamp += increment;
        }

        let snapshot = tstamp;
        tstamp += increment;
        while ( (tstamp + bus.offset) % bus.nr != 0)
        {
            tstamp += increment;
        }

        increment = tstamp - snapshot;
        tstamp = snapshot;

        //console.log('a', busIndex, tstamp, increment);
    });
    
    console.log(tstamp);

}
