import { getInputRows } from "./utils/utils";



export const day17 = () => {

    let rows = getInputRows('./input/17.txt');
    //console.log(rows);

    let space = [rows.map(row => row.trim().split('').map(c => c == '#'))];
    //console.log(space);

    const copySpace = (inSpace: boolean[][][]): boolean[][][] => inSpace.map(z => z.map(y => [...y]));

    const growSpaceAsNeeded = () => {
        //let xGrowthNeeded = space.reduce(flatSpace => flatSpace.reduce(linearSpace =>  ))
        let xMaxGrowthNeeded = false;
        let xMinGrowthNeeded = false;
        space.forEach (z => {
            /*if (xGrowthNeeded)
            {
                return;
            }*/

            z.forEach (y => {
                xMaxGrowthNeeded ||= y[y.length-1];
                xMinGrowthNeeded ||= y[0];
            });            
        });

        let yMaxGrowthNeeded = false;
        let yMinGrowthNeeded = false;
        space.forEach (z => {
            z[z.length-1].forEach (x => {
                yMaxGrowthNeeded ||= x;
            });            
        });

        space.forEach (z => {
            z[0].forEach (x => {
                yMinGrowthNeeded ||= x;
            });            
        });

        let zMaxGrowthNeeded = false;
        let zMinGrowthNeeded = false;
        space[space.length-1].forEach (y => {
            y.forEach (x => {
                zMaxGrowthNeeded ||= x;
            });            
        });

        space[0].forEach (y => {
            y.forEach (x => {
                zMinGrowthNeeded ||= x;
            });            
        });

        //console.log(xMaxGrowthNeeded, xMinGrowthNeeded, yMaxGrowthNeeded, yMinGrowthNeeded, zMaxGrowthNeeded, zMinGrowthNeeded);

        if (xMaxGrowthNeeded) {
            space = space.map(z => z.map(y => [...y, false]));
        }

        if (xMinGrowthNeeded) {
            space = space.map(z => z.map(y => [false, ...y]));
        }
        
        if (yMaxGrowthNeeded) {
            space = space.map(z => {
                let emptyrow = z[0].map(x => false);
                return [...z, emptyrow];
            });
        }

        if (yMinGrowthNeeded) {
            space = space.map(z => {
                let emptyrow = z[0].map(x => false);
                return [emptyrow, ...z];
            });
        }

        if (zMaxGrowthNeeded) {
            let emptySurface = space[0].map(y => y.map(x => false));
            space = [...space, emptySurface];
        }

        if (zMinGrowthNeeded) {
            let emptySurface = space[0].map(y => y.map(x => false));
            space = [emptySurface, ...space];
        }
    }

    const inBounds = (x: number, y: number, z: number) : boolean =>
        x >=0 && x < space[0][0].length &&
        y >= 0 && y < space[0].length &&
        z >= 0 && z < space.length;

    let tmpSpace = copySpace(space);
    const cycle = (x: number, y: number, z: number) => {
        //console.log(x, y, z);
        let active = space[z][y][x];
        let activeNeighbors = 0;

        for (let relx=-1; relx <= 1; ++relx) {
            for (let rely=-1; rely <= 1; ++rely) {
                for (let relz=-1; relz <= 1; ++relz) {
                    if (relx == 0 && rely == 0 && relz == 0) {
                        continue;
                    }

                    let xs = x + relx;
                    let ys = y + rely;
                    let zs = z + relz;

                    if (!inBounds(xs, ys, zs)) {
                        continue;
                    }

                    if (space[zs][ys][xs]) {
                        ++activeNeighbors;
                    }
                }
            }
        }

        if (active) {
            if(activeNeighbors == 2 || activeNeighbors == 3) {
                //stay active
            }
            else {
                tmpSpace[z][y][x] = false;
                //console.log('deactivating', x, y, z);
            }
        }
        else {
            if(activeNeighbors == 3) {
                tmpSpace[z][y][x] = true;
                //console.log('activating', x, y, z);
            }
            else {
               //stay inactive 
            }
        }

    }

    const cycleSpace = () => {
        for (let x=0; x < space[0][0].length; ++x) {
            for (let y=0; y < space[0].length; ++y) {
                for (let z=0; z < space.length; ++z) {
                    cycle(x, y, z);
                }
            }
        }
    }

    const nofActive = () => {
        let n = 0;
        for (let x=0; x < space[0][0].length; ++x) {
            for (let y=0; y < space[0].length; ++y) {
                for (let z=0; z < space.length; ++z) {
                    if (space[z][y][x]) {
                        ++n;
                    }
                }
            }
        }
        return n;
    }

    for (let i = 0; i < 6; ++i) {
        growSpaceAsNeeded();    
        tmpSpace = copySpace(space);
        cycleSpace();
        space = copySpace(tmpSpace);
    }


    //console.log(space);
    console.log(nofActive());

}



//////////////////////////////
//////////////////////////////
export const day17b = () => {

    let rows = getInputRows('./input/17.txt');
    //console.log(rows);

    let space = [[rows.map(row => row.trim().split('').map(c => c == '#'))]];
    //console.log(space);

    const copySpace = (inSpace: boolean[][][][]): boolean[][][][] => inSpace.map(w => w.map(z => z.map(y => [...y])));

    const growSpace = () => {

        space = space.map(w => w.map(z => z.map(y => [...y, false])));
        space = space.map(w => w.map(z => z.map(y => [false, ...y])));

        space = space.map(w => w.map(z => {
            let emptyrow = z[0].map(x => false);
            return [...z, emptyrow];
        }));

        space = space.map(w => w.map(z => {
            let emptyrow = z[0].map(x => false);
            return [emptyrow, ...z];
        }));

        space = space.map(w => {
            let emptySurface = w[0].map(y => y.map(x => false));
            return [...w, emptySurface];
        });

        space = space.map(w => {
            let emptySurface = w[0].map(y => y.map(x => false));
            return [emptySurface, ...w];
        });
        

        let emptyCube = space[0].map(z => z.map(y => y.map(x => false)));
        space = [...space, emptyCube];

        emptyCube = space[0].map(z => z.map(y => y.map(x => false)));
        space = [emptyCube, ...space];
    }

    const inBounds = (x: number, y: number, z: number, w: number) : boolean =>
        x >=0 && x < space[0][0][0].length &&
        y >=0 && y < space[0][0].length &&
        z >= 0 && z < space[0].length &&
        w >= 0 && w < space.length;

    let tmpSpace = copySpace(space);
    const cycle = (x: number, y: number, z: number, w: number) => {
        //console.log(x, y, z);
        let active = space[w][z][y][x];
        let activeNeighbors = 0;

        for (let relx=-1; relx <= 1; ++relx) {
            for (let rely=-1; rely <= 1; ++rely) {
                for (let relz=-1; relz <= 1; ++relz) {
                    for (let relw=-1; relw <= 1; ++relw) {
                        if (relx == 0 && rely == 0 && relz == 0 && relw == 0) {
                            continue;
                        }

                        let xs = x + relx;
                        let ys = y + rely;
                        let zs = z + relz;
                        let ws = w + relw;

                        if (!inBounds(xs, ys, zs, ws)) {
                            continue;
                        }

                        // console.log(x, y, z, w);
                        // console.log(xs, ys, zs, ws);
                        if (space[ws][zs][ys][xs]) {
                            ++activeNeighbors;
                        }
                    }
                }
            }
        }

        if (active) {
            if(activeNeighbors == 2 || activeNeighbors == 3) {
                //stay active
            }
            else {
                tmpSpace[w][z][y][x] = false;
                //console.log('deactivating', x, y, z, w);
            }
        }
        else {
            if(activeNeighbors == 3) {
                tmpSpace[w][z][y][x] = true;
                //console.log('activating', x, y, z, w);
            }
            else {
               //stay inactive 
            }
        }

    }

    const cycleSpace = () => {
        for (let x=0; x < space[0][0][0].length; ++x) {
            for (let y=0; y < space[0][0].length; ++y) {
                for (let z=0; z < space[0].length; ++z) {
                    for (let w=0; w < space.length; ++w) {
                        cycle(x, y, z, w);
                    }
                }
            }
        }
    }

    const nofActive = () => {
        let n = 0;
        for (let x=0; x < space[0][0][0].length; ++x) {
            for (let y=0; y < space[0][0].length; ++y) {
                for (let z=0; z < space[0].length; ++z) {
                    for (let w=0; w < space.length; ++w) {
                        if (space[w][z][y][x]) {
                            ++n;
                        }
                    }
                }
            }
        }
        return n;
    }

    for (let i = 0; i < 6; ++i) {
        growSpace();    
        tmpSpace = copySpace(space);
        cycleSpace();
        space = copySpace(tmpSpace);
    }


    // console.log(space);
    // console.log(space[0]);
    // growSpace();
    // console.log(space);
    // console.log(space[0]);
    console.log(nofActive());

}
