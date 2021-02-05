const fs = require('fs');

const INPUT = fs.readFileSync('input.txt').toString().trim();
const SAMPLES = fs.readFileSync('sample.txt').toString().trim().split(/\r?\n/);

function runFFT(signal, runtime = 100){ //signal in strings
    let sub = signal.split(''), length = signal.length;

    const generateOutput = (signal, pattern = [0, 1, 0, -1]) => { //signal in array
        return signal.map((digit, index) => {
            return Math.abs(signal.reduce((acc, b, i) => {
                let temp = Math.floor((i + 1) / (1 + index)) % 4;
                return temp == 0 || temp == 2 ? acc : acc + b * pattern[temp];
            }, 0)) % 10;
        })
    }

    for(let i = 0; i < runtime; i++) sub = generateOutput(sub, [0, 1, 0, -1], length);

    return sub.slice(0, 8).join('');
}

//solution is taken by slicing the signal at first by its offset, all operations left from there are just addition. added a cumulative sum for a linear time complexity in generating a single output
function runOffsetFFT(signal, runtime = 100){
    let offset = Number(signal.substr(0, 7)),
        sub = signal.repeat(10000).split('').map(Number).slice(offset);

    const generateOutput = (signal) => {
        let sum = 0;
        for(let i = signal.length - 1; i >= 0; i--){
            sum = (sum + signal[i]) % 10;
            signal[i] = sum;
        }
    }

    for(let i = 0; i < runtime; i++) generateOutput(sub);

    return sub.slice(0, 8).join('');
}

console.log('Part 1:', runFFT(INPUT));
console.log('Part 2:', runOffsetFFT(INPUT));