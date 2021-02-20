const runIntCode = require('./runIntCode.js');

const INPUT = require('fs').readFileSync('input.txt').toString().trim().split(',').map(Number);

function getPassword(intcode) {
    let subInt = [...intcode], haltStatus = [false, 0, 0];
    
    let north = 'north'.split('').map(a=>a.charCodeAt()).concat(10),
        south = 'south'.split('').map(a=>a.charCodeAt()).concat(10),
        east = 'east'.split('').map(a=>a.charCodeAt()).concat(10),
        west ='west'.split('').map(a=>a.charCodeAt()).concat(10);
    
    let run = runIntCode(subInt, 'north'.split('').map(a=>a.charCodeAt()).concat(10), 0, haltStatus);

    console.log(run.reduce((a, b) => a + String.fromCharCode(b), ''));
}


console.log(getPassword(INPUT));


