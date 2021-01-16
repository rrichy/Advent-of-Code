const input = require('fs').readFileSync('input.txt').toString().trim();

function locateFloor(steps){
    return steps.match(/\(/g).length - steps.match(/\)/g).length;
}

function locateBasement(steps){
    let floor = 0;
    for(let i = 0;; i++){
        floor = floor + (steps[i] === '(' ? 1 : -1);
        if(floor < 0) return i + 1;
    }
}

console.log('Part 1:', locateFloor(input));
console.log('Part 2:', locateBasement(input));