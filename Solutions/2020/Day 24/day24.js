const sample = require('fs').readFileSync('sample.txt').toString().trim().split(/\r?\n/);
const input = require('fs').readFileSync('input.txt').toString().trim().split(/\r?\n/); //p1: 394, p2: 4036


function numBlackTiles(tilesList){
    let bTiles = new Set(), [x, y, z] = [0, 0, 0]; //x {e, w}, y {ne, sw}, z {nw, se}
    let dirNum = {
        'e': function(){x++; z--;},
        'w': function(){x--; z++},
        'ne': function(){y++; z--;},
        'sw': function(){y--; z++},
        'se': function(){x++; y--;},
        'nw': function(){x--; y++;}
    };

    tilesList.forEach(tile => {
        for(let dir of tile.match(/e|se|sw|w|nw|ne/g)){
            dirNum[dir]();
        }

        if(bTiles.has([x, y, z].join(','))) bTiles.delete([x, y, z].join(','));
        else bTiles.add([x, y, z].join(','));

        [x, y, z] = [0, 0, 0]; 
        
        return;
    });

    return bTiles;
}

function tileFlip(origin, days){
    let slow = new Set(origin);

    let numBlackAdj = function(hexCoordinate, color = 1){
        let hex = hexCoordinate.split(',').map(Number), numAdj = 0;
        for(let y = -1; y <= 1; y++){
            for(let x = -1; x <= 1; x++){
                if(x !== y){
                    let temp = [hex[0] + x, hex[1] + y, -(hex[0] + x + hex[1] + y)].join(',');

                    if(slow.has(temp)) numAdj++;
                    else if(color === 1 && numBlackAdj(temp, 0) === 2){
                        origin.add(temp);
                    }
                }
            }
        }
        return numAdj;
    }

    for(let i = 0; i < days; i++){
        origin.forEach(btile => {
            let numAdj = numBlackAdj(btile);

            if(numAdj === 0 || numAdj > 2) origin.delete(btile);
        });
        slow = new Set(origin);
    }

    console.log(origin.size);
}

let current = numBlackTiles(input);

console.log('Part 1:', current.size);
console.log('Part 2:', tileFlip(current, 100));