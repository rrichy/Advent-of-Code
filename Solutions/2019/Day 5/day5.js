const input = require('fs').readFileSync('input.txt').toString().trim().split(',').map(Number);
const samples = [[1002,4,3,4,33], [1101,100,-1,4,0]];

function outputIntCode(intcode, input){    //array of nums
    let output, i = 0;

    while(true){
        if(intcode[i] === 99) break;

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
                if(op == 3) intcode[param[0]] = input;
                else output = opcode[2] == 0 ? intcode[param[0]] : param[0];
            }

            i += size;
        }
    }

    return output;
}

console.log('Part 1:', outputIntCode([...input], 1));
console.log('Part 2:', outputIntCode([...input], 5));