const { get } = require('http');

const input = require('fs').readFileSync('input.txt').toString().trim().split(',').map(Number);

function outputIntCode(intcode, input = 0, haltStatus = [false, 0, 0]){    //array of numss haltStatus = [stopIntcode, index, relativeBase]
    let output = [];
    
    const getIndex = (mode, currentPos) => {
        if(mode == 0) return intcode[currentPos];
        else if(mode == 1) return currentPos;
        else return intcode[currentPos] + haltStatus[2];
    }

    while(true){
        if(output.length == 3) return output;
        if(intcode[haltStatus[1]] == 99){ haltStatus[0] = true; return output; }
        
        let size, opcode = '0'.repeat(5 - String(intcode[haltStatus[1]]).length) + intcode[haltStatus[1]],
            op = opcode.slice(-1), //op [A, B, C, D, E]
            mode = [, opcode[2], opcode[1], opcode[0]]; // for better reading of code; mode[1] for parameter[1]/pos[1] and so on...
            
        // determining the size of the instruction for the parameters, also used for the position in the intcode
        if(op == 1 || op == 2 || op == 7 || op == 8) size = 4;
        else if(op == 3 || op == 4 || op == 9) size = 2;
        else size = 3;
        
        let pos = intcode.slice(haltStatus[1], haltStatus[1] + size), val = []; // parameter_1 = pos[1], parameter_2 = pos[2] . . ..

        for(let j = 1; j < size; j++){  //separating index and its real value for clarity
            pos[j] = getIndex(mode[j], haltStatus[1] + j);
            val[j] = intcode[pos[j]];
        }

        if(size == 3){ //jumps
            if(op == 5 && val[1] != 0) haltStatus[1] = val[2]; // if par1 is nonzero
            else if(op == 6 && val[1] == 0) haltStatus[1] = val[2]; // if par1 is zero
            else haltStatus[1] += size;
        }
        else{
            if(size == 4){
                if(op == 1) intcode[pos[3]] = val[1] + val[2]; // add
                else if(op == 2) intcode[pos[3]] = val[1] * val[2]; // multiply
                else if(op == 7) intcode[pos[3]] = val[1] < val[2] ? 1 : 0; // par1 < par2
                else intcode[pos[3]] = val[1] == val[2] ? 1 : 0;  // op=8; par1 == par2
            }
            else if(size == 2){
                if(op == 3) intcode[pos[1]] = input;
                else{
                    if(op == 4) output.push(val[1]);
                    else haltStatus[2] += val[1]; // op = 9
                } 
            }

            haltStatus[1] += size;
        }
    }
}

function drawTerrain(terrain, height){
    let map = Array(height+1).fill().map(_=>[]);

    terrain.forEach((val, key) => {
        let [x, y] = key.split(', ').map(Number);
        if(val == 0) map[y][x] = ' ';
        else if(val == 1) map[y][x] = '#';
        else if(val == 2) map[y][x] = 'H';
        else if(val == 3) map[y][x] = '_';
        else map[y][x] = 'O';
    });

    return map.map(a => a.join('')).join('\n');
}

function countBlock(intcode){
    let sub = [...intcode], status = [false, 0, 0],
        terrain = new Map(), block = 0, height = 0;

    while(true){
        [x, y, id] = outputIntCode(sub, 0, status);
        if(status[0]) break;

        if(y > height) height = y;

        terrain.set(`${x}, ${y}`, id);
        if(id == 2) block++;
    }

    return block;
}

function getScore(intcode){
    let sub = [...intcode], status = [false, 0, 0], jstick = 0,
        terrain = new Map(), score = 0, height = 0, ball, paddle;

    sub[0] = 2;

    while(true){
        [x, y, id] = outputIntCode(sub, jstick, status);
        if(status[0]) break;

        if(y > height) height = y;

        if(x == -1 && y == 0){
            score = id;
        }
        else{
            terrain.set(`${x}, ${y}`, id);
            if(id == 3) paddle = x;
            if(id == 4) ball = x;
        }

        if(paddle && ball){
            if(ball > paddle) jstick = 1;
            else if(ball < paddle) jstick = -1;
            else jstick = 0;
        }
    }

    return score;
}

console.log('Part 1:', countBlock(input));
console.log('Part 2', getScore(input));