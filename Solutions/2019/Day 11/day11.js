const input = require('fs').readFileSync('input.txt').toString().trim().split(',').map(Number);

function outputIntCode(intcode, input, index = 0, relBase = 0){    //array of numss
    let output = [];
    
    const getIndex = (mode, currentPos) => {
        if(mode == 0) return intcode[currentPos];
        else if(mode == 1) return currentPos;
        else return intcode[currentPos] + relBase;
    }

    while(true){
        if(intcode[index] == 99) return [output, true, index];
        
        let size, opcode = '0'.repeat(5 - String(intcode[index]).length) + intcode[index],
            op = opcode.slice(-1), //op [A, B, C, D, E]
            mode = [, opcode[2], opcode[1], opcode[0]]; // for better reading of code; mode[1] for parameter[1]/pos[1] and so on...
            
        // determining the size of the instruction for the parameters, also used for the position in the intcode
        if(op == 1 || op == 2 || op == 7 || op == 8) size = 4;
        else if(op == 3 || op == 4 || op == 9) size = 2;
        else size = 3;
        
        let pos = intcode.slice(index, index + size), val = []; // parameter_1 = pos[1], parameter_2 = pos[2] . . ..

        for(let j = 1; j < size; j++){  //separating index and its real value for clarity
            pos[j] = getIndex(mode[j], index + j);
            val[j] = intcode[pos[j]];
        }
        // console.log(intcode.slice(index, index + size));
        // console.log([intcode[index], ...val.slice(1)], 'base', relBase);
        if(size == 3){ //jumps
            if(op == 5 && val[1] != 0) index = val[2]; // if par1 is nonzero
            else if(op == 6 && val[1] == 0) index = val[2]; // if par1 is zero
            else index += size;
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
                    if(op == 4){
                        output.push(val[1]);
                        if(output.length == 2) return [output, false, index + size, relBase];
                    }
                    else relBase += val[1]; // op = 9
                } 
            }

            index += size;
        }
    }
}

function paintedPanelsCount(intcode){
    let black = new Set(), white = new Set(), [x, y] = [0, 0], pauseIndex = 0, stopCode, base = 0,
        paint, turn, face = '^'
        dir = {
            '^': [() => { x--; face = '<'; }, () => { x++; face = '>'; }],
            '<': [() => { y--; face = 'v'; }, () => { y++; face = '^'; }],
            'v': [() => { x++; face = '>'; }, () => { x--; face = '<'; }],
            '>': [() => { y++; face = '^'; }, () => { y--; face = 'v'; }]
        };

    while(true){
        [[paint, turn], stopCode, pauseIndex, base] = outputIntCode(intcode, white.has(`${x}, ${y}`) ? 1 : 0, pauseIndex, base);

        if(stopCode) break;

        if(paint == 1){
            white.add(`${x}, ${y}`);
            black.delete(`${x}, ${y}`);
        }
        else{
            black.add(`${x}, ${y}`);
            white.delete(`${x}, ${y}`);
        }

        dir[face][turn]();
    }

    return black.size + white.size;
}

function getIdentifier(intcode){
    let black = new Set(), white = new Set(), [x, y] = [0, 0], pauseIndex = 0, stopCode, input = 1, base = 0,
        paint, turn, face = '^'
        dir = {
            '^': [() => { x--; face = '<'; }, () => { x++; face = '>'; }],
            '<': [() => { y--; face = 'v'; }, () => { y++; face = '^'; }],
            'v': [() => { x++; face = '>'; }, () => { x--; face = '<'; }],
            '>': [() => { y++; face = '^'; }, () => { y--; face = 'v'; }]
        };

    while(true){
        if(black.size != 0 || white.size != 0) input = white.has(`${x}, ${y}`) ? 1 : 0;
        [[paint, turn], stopCode, pauseIndex, base] = outputIntCode(intcode, input, pauseIndex, base);

        if(stopCode) break;

        if(paint == 1){
            white.add(`${x}, ${y}`);
            black.delete(`${x}, ${y}`);
        }
        else{
            black.add(`${x}, ${y}`);
            white.delete(`${x}, ${y}`);
        }

        dir[face][turn]();
    }

    //get canvas size;
    white = Array.from(white);

    let min_x = Math.min(...white.map(a => Number(a.split(', ')[0]))), width = Math.max(...white.map(a => Number(a.split(', ')[0]))) - min_x,
        min_y = Math.min(...white.map(a => Number(a.split(', ')[1]))), height = Math.max(...white.map(a => Number(a.split(', ')[1]))) - min_y,
        row = Array(height + 1).fill().map(_=> Array(width + 1).fill().map(_=>' '));

    min_x *= -1;
    min_y *= -1;

    white.forEach(coordinate => {
        let [x, y] = coordinate.split(', ').map(Number);
        row[y + min_y][x + min_x] = '#';
    });


    return row.map(a => a.join('')).reverse();
}

console.log('Part 1:', paintedPanelsCount([...input]));
console.log('Part 2:', getIdentifier([...input]));
