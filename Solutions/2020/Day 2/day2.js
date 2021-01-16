const passwords = require('fs').readFileSync('input.txt').toString().trim().split(/\r?\n/);

function validPasswords(arr){
    let valid = 0;

    for(let password of arr){
        let [, min, max, char, pass] = password.match(/(\d+)-(\d+) ([a-z]): (\w+)/),
            charNum = pass.split('').filter(a => a == char).length;

        if(charNum >= min && charNum <= max){
            valid++;
        }
    }

    return valid;
}

function validPasswords_corrected(arr){
    let valid = 0;

    for(let password of arr){
        let [, pos1, pos2, char, pass] = password.match(/(\d+)-(\d+) ([a-z]): (\w+)/)

        if((pass[pos1 - 1] == char && pass[pos2 - 1] != char) || (pass[pos2 - 1] == char && pass[pos1 - 1] != char)){
            valid++;
        }
    }

    return valid;
}

console.log('Part 1:', validPasswords(passwords));
console.log('Part 2:', validPasswords_corrected(passwords));