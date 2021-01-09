const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim();
const sample1 = fs.readFileSync('sample1.txt').toString().trim();
const sample2 = fs.readFileSync('sample2.txt').toString().trim();

function getSetup(adaptersList){
    const adapters = adaptersList.split(/\r?\n/).map(Number).sort((a, b) => a - b),
        builtIn = adapters[adapters.length - 1] + 3;

    adapters.unshift(0);
    adapters.push(builtIn);

    return adapters;
}

function getNumDifference(adaptersList){
    let differences = [0, 0, 0];

    for(let i = 1; i < adaptersList.length; i++){
        differences[adaptersList[i] - adaptersList[i - 1] - 1]++;
    }

    return differences[0] * differences[2];
}

function getDistinctOrder(adaptersList){
    let ways = {6: 13, 5: 7, 4: 4, 3: 2, 2: 1, 1: 1}, // from manually determining number of ways given length of numbers with difference of 1
        block = [], temp = 1;

    for(let i = 1; i < adaptersList.length; i++){
        if(adaptersList[i] - adaptersList[i - 1] === 3){ 
            block.push(temp); // push number of distinct ways the temp can be arranged
            temp = 1;
        }
        else temp++;
    }
    
    return block.reduce((a, b) => a * ways[b], 1);
}

let setup = getSetup(input);

console.log('Part 1:', getNumDifference(setup));
console.log('Part 2:', getDistinctOrder(setup));