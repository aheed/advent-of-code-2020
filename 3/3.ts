import {getInputRows} from '../utils/utils';

type TerrainType = '#' | '.';

class SlopeRow {
    constructor(row: string) {
        this.terrain = row.split("").map(char => char as TerrainType);
    };
    
    terrain: TerrainType[] = [];

    get width(): number {
        return this.terrain.length;
    }

    getTerrainType = (colIndex: number) : TerrainType => {
        let col = colIndex % this.width;
        return this.terrain[col];
    }
}

class Slope {

    constructor(rows: string[]) {
        this.terrainRows = rows.map(row => new SlopeRow(row));
    }

    terrainRows: SlopeRow[];
}

export const day3 = () => {
    let rows = getInputRows('./input/3.txt');
    let slope = new Slope(rows);

    let res = slope.terrainRows.map<number>((slopeRow: SlopeRow, index:number) =>
      slopeRow.getTerrainType(index * 3) === '#' ? 1 : 0).reduce((prev, curr) => prev + curr);

    console.log(res);
}

const countTrees = (slope: Slope, right: number, down: number) : number => 
    slope.terrainRows.filter((v, index) => index % down === 0)
    .map<number>((slopeRow: SlopeRow, index:number) => slopeRow.getTerrainType(index * right) === '#' ? 1 : 0)
    .reduce((prev, curr) => prev + curr);

export const day3b = () => {
    let rows = getInputRows('./input/3.txt');
    let slope = new Slope(rows);
    let trees: number[] = [];
    trees.push(countTrees(slope, 1, 1));
    trees.push(countTrees(slope, 3, 1));
    trees.push(countTrees(slope, 5, 1));
    trees.push(countTrees(slope, 7, 1));
    trees.push(countTrees(slope, 1, 2));
    let res = trees.reduce((prev, curr) => prev * curr);
    console.log(res);
}
