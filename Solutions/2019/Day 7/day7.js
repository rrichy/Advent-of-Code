const input = require('fs').readFileSync('input.txt').toString().trim().split(',').map(Number);
const permutation = require('./permutation.js').getArrPermutations;

function outputIntCode(intcode, input, startAt = 0){    //input - array of nums
    let i = startAt, halt = false;

    while(true){
        if(intcode[i] === 99){ halt = true; break; }

        let size, opcode = ('0'.repeat(5 - String(intcode[i]).length) + intcode[i]), op = opcode.slice(-1); //op [A, B, C, D, E]

        if(op == 1 || op == 2 || op == 7 || op == 8) size = 4;
        else if(op == 3 || op == 4) size = 2;
        else size = 3;

        let [, ...param] = intcode.slice(i, i + size);

        if(size == 3){
            if(opcode[2] == 0) param[0] = intcode[param[0]];
            if(opcode[1] == 0) param[1] = intcode[param[1]];

            if(op == 5 && param[0] != 0) i = param[1];
            else if(op == 6 && param[0] == 0) i = param[1];
            else i += size;
        }
        else{
            if(size == 4){
                if(opcode[2] == 0) param[0] = intcode[param[0]];
                if(opcode[1] == 0) param[1] = intcode[param[1]];
                
                if(op == 1) intcode[param[2]] = param[0] + param[1];
                else if(op == 2) intcode[param[2]] = param[0] * param[1];
                else if(op == 7) intcode[param[2]] = param[0] < param[1] ? 1 : 0;
                else intcode[param[2]] = param[0] == param[1] ? 1 : 0;
            }
            else if(size == 2){
                if(op == 3){
                    if(input.length){
                        intcode[param[0]] = input.shift();
                    }
                    else{
                        break;
                    }
                }
                else output = opcode[2] == 0 ? intcode[param[0]] : param[0];
            }

            i += size;
        }
    }

    return [halt, output, i];
}

function maxSignal(intcode){
    let sequences = permutation([0,1,2,3,4]), max = 0;
    
    const getSignal = (intcode, sequence) => {
        let output = 0;
    
        for(let seq of sequence){
            let [halt, temp] = outputIntCode(intcode, [seq, output]);
            if(halt) output = temp;
        }
        return output;
    }

    for(let sequence of sequences){
        let temp = getSignal(intcode, sequence);
        if(temp > max) max = temp;
    }
    
    return max;
}

function maxFeedbackLoop(intcode){
    let sequences = permutation([5,6,7,8,9]); max = 0;

    for(let sequence of sequences){
    // for(let sequence of [[9,7,8,5,6]]){
        let current = 0, acs = Array(5).fill().map(_=>[...intcode]), startAt = [0, 0, 0, 0, 0],
            inputs = [ [sequence[0], 0], [sequence[1]], [sequence[2]], [sequence[3]], [sequence[4]] ],
            halt, temp, pauseAt;

        while(true){
            [halt, temp, pauseAt] = outputIntCode(acs[current], inputs[current], startAt[current]);
            
            if(current === 4 && halt) break;
            startAt[current] = pauseAt;
            
            current++;
            if(current > 4) current = 0;
            
            inputs[current].push(temp);
        }

        if(temp > max) max = temp;
    }

    return max;
}

console.log('Part 1:', maxSignal(input));
console.log('Part 2:', maxFeedbackLoop(input));