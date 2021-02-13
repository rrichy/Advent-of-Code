const runIntCode = require('./runIntCode.js');

const INPUT = require('fs').readFileSync('input.txt').toString().trim().split(',').map(Number);

function damageReport(intcode) {
    let sub = [...intcode], instruction = [], input = [];
    
    instruction.push('NOT C J');
    instruction.push('AND D J');
    instruction.push('NOT A T');
    instruction.push('OR T J');
    instruction.push('WALK');

    instruction.forEach(a => input = input.concat(a.split('').map(b => b.charCodeAt()), 10));
    let run = runIntCode(sub, input);

    // console.log(run.map(a => String.fromCharCode(a)).join(''));

    return run[run.length - 1];
}

function damageReportRUN(intcode) {
    let sub = [...intcode], instruction = [], input = [];
    
    instruction.push('NOT C J');
    instruction.push('AND D J');
    instruction.push('AND H J');
    instruction.push('NOT B T');
    instruction.push('AND D T');
    instruction.push('OR T J    ');
    instruction.push('NOT A T');
    instruction.push('OR T J');
    instruction.push('RUN');

    instruction.forEach(a => input = input.concat(a.split('').map(b => b.charCodeAt()), 10));
    let run = runIntCode(sub, input);

    // console.log(run.map(a => String.fromCharCode(a)).join(''));

    return run[run.length - 1];
}

console.log('Part 1:', damageReport(INPUT));
console.log('Part 2:', damageReportRUN(INPUT));
// console.log(runIntCode(INPUT).map(a=> String.fromCharCode(a)).join(''));
// console.log(runIntCode(INPUT, 'NOT A J'.split('').map(a=>a.charCodeAt()).concat(10, 'WALK'.split('').map(a=>a.charCodeAt()), 10)).map(a=> String.fromCharCode(a)).join(''));