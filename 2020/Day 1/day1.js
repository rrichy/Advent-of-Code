const expenses = require('fs').readFileSync('sample.txt').toString().trim().split('\n').map(Number);

function findValuesWithSum(arr, sum, numVals = 2){
    let set = new Set();

    for(let i of arr){
        if(numVals == 2){
            if(set.has(sum - i)){
                return [i, sum - i];
            }
        }

        else{
            let root = findValuesWithSum(Array.from(set), sum - i, numVals - 1);

            if(root){
                return [...root, i];
            }
        }
        set.add(i)
    }
    return false;
}

console.log('Part 1:', findValuesWithSum(expenses, 2020, 2).reduce((a, b) => a * b));
console.log('Part 2:', findValuesWithSum(expenses, 2020, 3).reduce((a, b) => a * b));