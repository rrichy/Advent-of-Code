const runIntCode = require('./runIntCode.js');

const INPUT = require('fs').readFileSync('input.txt').toString().trim().split(',').map(Number);

function drawBeam(intcode, width, height) {
    let rows = [], areaCount = 0;
    for(let y = 0; y < height; y++){
        let col = [], beamstart = false;
        for(let x = 0; x < width; x++){
            let sub = [...intcode], temp = runIntCode(sub, [x, y])[0];
            
            if(temp) areaCount++;
            col.push(temp == 1 ? '#' : ' ');
            if(!beamstart && temp == 1) beamstart = true;
            if(beamstart && temp == 0) break;
        }
        rows.push(col.join('') + ' '.repeat(width - col.length));
    }

    console.log(rows.join('\n'));
    return areaCount;
}

function santasShip(intcode, width, height) {
    //approximating the location of the top right corner of the object
    let beamstart = false, b, beta, gamma, xb, yb;
    for(let x = 0;; x++){
        let sub = [...intcode], temp = runIntCode(sub, [x, 1000])[0];

        if(!beamstart && temp == 1){ beta = Math.atan(x / 1000); beamstart = true; }
        if(beamstart && temp == 0){ gamma = Math.atan(x / 1000) - beta; break; }
    }
    b = Math.sqrt(width**2 + height**2) * Math.sin(beta + Math.PI/4) / Math.sin(gamma);
    xb = Math.floor(b * Math.sin(beta + gamma));
    yb = Math.floor(b * Math.cos(beta + gamma));
    // end of approximation

    const objectFit = (x, y) => {
        let sub = [...intcode], temp = runIntCode(sub, [x - (width-1), y + (height-1)])[0];
        // if object fit, return coordinat of top left corner
        return temp == 1 ? [x - (width-1), y] : false;
    }

    let lastClosestCorner, stop = 5; // due to inconsistent slope of the beam, an allowance of five is set - no basis
    for(let suby = 0;; suby++){
        let [x, y] = [xb, yb];
        for(let subx = 0;; subx++){
            let sub = [...intcode], temp = runIntCode(sub, [x - subx, y - suby])[0];

            if(temp == 1){
                let corner = objectFit(x - subx, y - suby);
                if(corner != false) lastClosestCorner = corner;
                else stop--;

                break;
            }
        }
        if(!stop) break;
    }

    return lastClosestCorner[0] * 10000 + lastClosestCorner[1];
}

console.log(drawBeam(INPUT, 50, 50));
console.log(santasShip(INPUT, 100, 100))

