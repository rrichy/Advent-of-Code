const fs = require('fs');
const input = fs.readFileSync('day17-input.txt').toString().trim();

function cubesActive(cycle, dimension){
    let cubes = [new Set(), new Set()], //0: inactive, 1: active
        minmaxX = [0],
        minmaxY = [0, input.match(/\n/g).length],
        minmaxZ = [0, 0], minmaxW = [0, 0];

    if(dimension == 3){
        input.split('\n').forEach((row, y) => {
            if(y == 0) minmaxX[1] = row.trim().length - 1;
            row.trim().split('').forEach((val, x) => {
                if(val == '#') cubes[1].add(`${x},${y},0`);
                else cubes[0].add(`${x},${y},0`);
            });
        });
    
        for(let i = 1; i <= cycle; i++){
            let tempcubes = [new Set(), new Set()];
    
            for(let z = minmaxZ[0] - i; z <= minmaxZ[1] + i; z++){
                for(let y = minmaxY[0] - i; y <= minmaxY[1] + i; y++){
                    for(let x = minmaxX[0] - i; x <= minmaxX[1] + i; x++){
                        let neighbors = [0, 0];
                        for(let cube of findNeighbors(x, y, z)){
                            if(cubes[1].has(cube)) neighbors[1]++;
                            else neighbors[0]++;
                        }
    
                        if(cubes[1].has(`${x},${y},${z}`)){
                            if(neighbors[1] == 2 || neighbors[1] == 3) tempcubes[1].add(`${x},${y},${z}`);
                            else tempcubes[0].add(`${x},${y},${z}`);
                        }
                        else{
                            if(neighbors[1] == 3) tempcubes[1].add(`${x},${y},${z}`);
                            else tempcubes[0].add(`${x},${y},${z}`);
                        }
                    }
                }
            }
    
            cubes = [new Set([...tempcubes[0]]), new Set([...tempcubes[1]])];
        }

        return cubes[1].size;
    }

    if(dimension == 4){

        input.split('\n').forEach((row, y) => {
            if(y == 0) minmaxX[1] = row.trim().length - 1;
            row.trim().split('').forEach((val, x) => {
                if(val == '#') cubes[1].add(`${x},${y},0,0`);
                else cubes[0].add(`${x},${y},0,0`);
            });
        });
    
        for(let i = 1; i <= cycle; i++){
            let tempcubes = [new Set(), new Set()];
    
            for(let w = minmaxW[0] - i; w <= minmaxW[1] + i; w++){
                for(let z = minmaxZ[0] - i; z <= minmaxZ[1] + i; z++){
                    for(let y = minmaxY[0] - i; y <= minmaxY[1] + i; y++){
                        for(let x = minmaxX[0] - i; x <= minmaxX[1] + i; x++){
                            let neighbors = [0, 0];
                            for(let cube of findNeighbors(x, y, z, w)){
                                if(cubes[1].has(cube)) neighbors[1]++;
                                else neighbors[0]++;
                            }
        
                            if(cubes[1].has(`${x},${y},${z},${w}`)){
                                if(neighbors[1] == 2 || neighbors[1] == 3) tempcubes[1].add(`${x},${y},${z},${w}`);
                                else tempcubes[0].add(`${x},${y},${z},${w}`);
                            }
                            else{
                                if(neighbors[1] == 3) tempcubes[1].add(`${x},${y},${z},${w}`);
                                else tempcubes[0].add(`${x},${y},${z},${w}`);
                            }
                        }
                    }
                }
            }
    
            cubes = [new Set([...tempcubes[0]]), new Set([...tempcubes[1]])];
        }

        return cubes[1].size;
    }

    //functions to help
    function findNeighbors(x, y, z, w = 0){
        let coor = [];
        for(let z1 = -1; z1 <= 1; z1++){
            for(let y1 = -1; y1 <= 1; y1++){
                for(let x1 = -1; x1 <= 1; x1++){
                    if(dimension == 3){
                        if(!(x1 == 0 && y1 == 0 && z1 == 0)){
                            coor.push(`${x + x1},${y + y1},${z + z1}`);
                        }
                    }
                    if(dimension == 4){
                        for(let w1 = -1; w1 <= 1; w1++){
                            if(!(x1 == 0 && y1 == 0 && z1 == 0 && w1 == 0)){
                                coor.push(`${x + x1},${y + y1},${z + z1},${w + w1}`);
                            }
                        }
                    }
                }
            }
        }
        return coor;
    }
}

console.log('Part 1:', cubesActive(6,3))
console.log('Part 2:', cubesActive(6,4));