import { getInputRows } from "./utils/utils";


type NavInstruction = 'N' | 'S' | 'E' | 'W' | 'L' | 'R' | 'F';

class NavigateOrder {
    constructor(instruction: NavInstruction, quantity:number) {
        this.instruction = instruction;
        this.quantity = quantity;
    }
    instruction: NavInstruction;
    quantity: number;
}

const readInput = (rows: string[]): NavigateOrder[] => rows.map(row => {
    let m = row.match(/(?<i>.)(?<q>\d*)/);
    return new NavigateOrder(m?.groups?.i as NavInstruction, parseInt(m?.groups?.q ?? ''));
});



export const day12 = () => {

    let rows = getInputRows('./input/12.txt');
    //let rows = getInputRows('./input/12ex.txt');
    let orders = readInput(rows);
    let bearing = 0; //East
    let posx = 0;
    let posy = 0;

    const ExecuteOrder = (order: NavigateOrder): void => {
        switch (order.instruction) {
            case 'N':
                posy += order.quantity;
                break;

            case 'S':
                posy -= order.quantity;
                break;

            case 'E':
                posx += order.quantity;
                break;

            case 'W':
                posx -= order.quantity;
                break;

            case 'L':
                bearing = (bearing + order.quantity + 360) % 360;
                break;

            case 'R':
                bearing = (bearing - order.quantity + 360) % 360;
                break;

            case 'F':
                let xmultiplier = bearing == 0 ? 1 : bearing == 180 ? -1 : 0;
                let ymultiplier = bearing == 90 ? 1 : bearing == 270 ? -1 : 0;
                posx += order.quantity * xmultiplier;
                posy += order.quantity * ymultiplier;
                break;
        
            default:
                break;
        }
    }

    let wpx = 0;
    let wpy = 0;
    
    const rotateWp90DegreesCCW = () => {
        let wpy_new = wpx;
        let wpx_new = -wpy;
        wpx = wpx_new;
        wpy = wpy_new;
    }

    const rotateWp90DegreesCW = () => {
        let wpy_new = -wpx;
        let wpx_new = wpy;
        wpx = wpx_new;
        wpy = wpy_new;
    }

    const ExecuteOrder2 = (order: NavigateOrder): void => {
        switch (order.instruction) {
            case 'N':
                wpy += order.quantity;
                break;

            case 'S':
                wpy -= order.quantity;
                break;

            case 'E':
                wpx += order.quantity;
                break;

            case 'W':
                wpx -= order.quantity;
                break;

            case 'L':
                for (let r=order.quantity; r>0; r -= 90) {
                    rotateWp90DegreesCCW();
                }
                break;

            case 'R':
                for (let r=order.quantity; r>0; r -= 90) {
                    rotateWp90DegreesCW();
                }
                break;

            case 'F':
                posx += order.quantity * wpx;
                posy += order.quantity * wpy;
                break;
        
            default:
                break;
        }
    }

    //console.log(rows);
    //console.log(orders);
    
    orders.forEach(o => ExecuteOrder(o));

    console.log(bearing);
    console.log(posx);
    console.log(posy);
    console.log(Math.abs(posx) + Math.abs(posy));

    // Part 2
    bearing = 0; //East
    posx = 0;
    posy = 0;
    wpx = 10;
    wpy = 1;

    orders.forEach(o => ExecuteOrder2(o));
    console.log('');
    console.log(posx);
    console.log(posy);
    console.log(Math.abs(posx) + Math.abs(posy));

}
