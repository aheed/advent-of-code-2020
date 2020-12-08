import { getInputRows } from "./utils/utils";


class BagSpec {
    constructor(quantity: number, description: string) {
        this.quantity = quantity;
        this.description = description;
    }
    quantity: number;
    description: string;
}

const readBagInput = (row:string): [description: string, specs: BagSpec[]] => {
    const nob = 'no other bags.';
    let match = row.match(/^(?<desc>.+) bags contain (?<contents>.+)$/);
    let contentsRow = match?.groups?.contents ?? nob;

    let contents: string[] = [];
    if (contentsRow != nob) {
        contentsRow = contentsRow.replace('.', '');
        contents = contentsRow.split(',');        
    }
    
    contents.map(r => r.trim());
    let specs = contents.map(s => {
        s = s.trim().replace(/ bag(s)*/, '');
        let bagSpecParts = s.match(/^(?<quant>\d) (?<bagDesc>.+)$/);
        return new BagSpec(parseInt(bagSpecParts?.groups?.quant ?? ''), bagSpecParts?.groups?.bagDesc ?? '');
    });

    return [match?.groups?.desc ?? '', specs];
}



export const day7 = () => {
    let rows = getInputRows('./input/7.txt');
    
    let bagInputs = rows.map(row => readBagInput(row));

    let bagMap = new Map<string, BagSpec[]>(bagInputs);

    const containsGold = (description: string) : boolean => {
        let ret = false;
        bagMap.get(description)?.forEach(element => {
            if (ret || element.description == 'shiny gold' || containsGold(element.description)){
                ret = true;
            }
        });

        return ret;
    }

    const countContainedBags = (description: string) : number => {
        let ret = 0;
        bagMap.get(description)?.forEach(element => {
            ret += element.quantity * (1 + countContainedBags(element.description));
        });

        return ret;
    }

    let res = [...bagMap.keys()].map<number>(key => containsGold(key) ? 1 : 0);

    let total = res.reduce((prev, curr) => prev + curr);
    console.log(total);

    let shinyContents = countContainedBags('shiny gold');
    console.log(shinyContents);
}
