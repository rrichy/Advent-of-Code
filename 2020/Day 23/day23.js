const PART1_crabCubs = require('./part1').crabCups;
const PART2_crabCubs = require('./part2').crabCups;

const sample = '389125467';
const input = '716892543';

let target = input;

console.log('Part 1:', PART1_crabCubs(target));
console.log('Part 2:', PART2_crabCubs(target));