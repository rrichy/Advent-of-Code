const input = require('fs').readFileSync('input.txt').toString().trim().split(',').map(Number);
const samples = require('fs').readFileSync('sample.txt').toString().trim().split(/\r?\n/).map(line => line.split(',').map(Number));

function opcode(intcode){
    for(let i = 0;; i += 4){
        let [op, ad1, ad2, loc] = intcode.slice(i, i + 4);
        if(op === 1) intcode[loc] = intcode[ad1] + intcode[ad2];
        else if(op === 2) intcode[loc] = intcode[ad1] * intcode[ad2];
        else break;
    }
    return intcode;
}

function programAlarm(intcode){
    let sub = [...intcode];
    [sub[1], sub[2]]= [12, 2];
    
    return opcode(sub)[0]
}

function programAlarm2(intcode){
    for(let i = 0; i < 100; i++){
        for(let j = 0; j < 100; j++){
            let sub = [...intcode];
            [sub[1], sub[2]]= [i, j];
            if(opcode(sub)[0] === 19690720) return 100 * i + j;
        }
    }
}

console.log('Part 1:', programAlarm(input));
console.log('Part 2:', programAlarm2(input));