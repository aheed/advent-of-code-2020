import { reduceEachLeadingCommentRange } from "typescript";
import { getInputRows } from "../utils/utils";

type Seat = 'L' | '.' | '#';

export const day11 = () => {
    let rows = getInputRows('./input/11.txt');
    //let rows = getInputRows('./input/11ex.txt');

    let seats: Seat[][] = rows.map(row => row.split('') as Seat[]);
    let original = [...seats];

    const indexToCoords = (rowWidth: number, index: number): [x: number, y: number] =>  [index % rowWidth, Math.floor(index / rowWidth)];
    const coordsToIndex = (rowWidth:number, x:number, y:number): number => y * rowWidth + x;
    const inBounds = (width: number, height: number, x: number, y: number) : boolean => x >=0 && x < width && y >= 0 && y < height;
    const printSeats = () : void => seats.forEach(row => {
        console.log(row.join(''));
    });;
    const isEqual = (seats: Seat[][], seats2: Seat[][]): boolean => seats.flatMap((row, rowIndex) => row.map((s, colIndex) => s === seats2[rowIndex][colIndex])).reduce((prev, curr) => prev && curr);
    const countOccupied = (seats: Seat[][]): number => seats.flatMap(row => row.map<number>(seat => seat === '#' ? 1 : 0)).reduce((prev, curr) => prev + curr);

    let nofColumns = seats[0].length;
    let nofRows = seats.length;


    const processSeatByCoords = (seats: Seat[][], x: number, y: number): Seat => {
        //let freeSeats = 0;
        let occupiedSeats = 0;
        for (let relx=-1; relx <= 1; ++relx) {
            for (let rely=-1; rely <= 1; ++rely) {
                if (relx == 0 && rely == 0) {
                    continue;
                }

                let xs = x + relx;
                let ys = y + rely;

                if (!inBounds(nofColumns, nofRows, xs, ys)) {
                    continue;
                }

                let seat = seats[ys][xs];

                if (seat == 'L') {
                    //freeSeats++;
                }
                else  if (seat == '#') {
                    occupiedSeats++;
                }
            }
        }

        //console.log('occupied:', occupiedSeats);
        let currSeat = seats[y][x];
        if (currSeat == 'L' && occupiedSeats == 0) {
            currSeat = '#';
        }
        else if (currSeat == '#' && occupiedSeats >= 4) {
            currSeat = 'L';
        }
        return currSeat;
    }

    const processSeatByCoords2 = (seats: Seat[][], x: number, y: number): Seat => {
        let occupiedSeats = 0;
        for (let relx=-1; relx <= 1; ++relx) {
            for (let rely=-1; rely <= 1; ++rely) {
                if (relx == 0 && rely == 0) {
                    continue;
                }

                let seat = '.';
                let xs = x + relx;
                let ys = y + rely;

                if (Math.abs(x - xs) != Math.abs(y - ys)
                    && relx != 0 && rely != 0) {
                    continue;
                }

                while (inBounds(nofColumns, nofRows, xs, ys)) {
                    seat = seats[ys][xs];
                    if (seat == '#') {
                        occupiedSeats++;
                        break;
                    }
                    else if (seat == 'L') {
                        break;
                    }

                    xs += relx;
                    ys += rely;
                }
                
            }
        }

        //console.log('occupied:', occupiedSeats);
        let currSeat = seats[y][x];
        if (currSeat == 'L' && occupiedSeats == 0) {
            currSeat = '#';
        }
        else if (currSeat == '#' && occupiedSeats >= 5) {
            currSeat = 'L';
        }
        return currSeat;
    }

    const processRound = () => {
        seats = seats.map((seatRow, rowIndex, arr) => {
            seatRow = seatRow.map((seat, colIndex, arr) => processSeatByCoords(seats, colIndex, rowIndex));
            return seatRow;
        });
    }

    const processRound2 = () => {
        seats = seats.map((seatRow, rowIndex, arr) => {
            seatRow = seatRow.map((seat, colIndex, arr) => processSeatByCoords2(seats, colIndex, rowIndex));
            return seatRow;
        });
    }

    
    let cmp = [...seats].map(r => r.map(s => '.' as Seat));
    while (!isEqual(cmp, seats)) {
        cmp = [...seats];
        processRound();
    }

    console.log(countOccupied(seats));

    seats = [...original];
    console.log('');
    //printSeats();
    cmp = [...seats].map(r => r.map(s => '.' as Seat));
    while (!isEqual(cmp, seats)) {
        cmp = [...seats];
        processRound2();
        //console.log('');
        //printSeats();
    }

    console.log(countOccupied(seats));
}