const fs = require('fs');
const input = fs.readFileSync('day18-input.txt').toString().trim();

function dumbDown(){
    let values = [];
    for(let strng of input.split('\n')){
        let toEval;
        strng = strng.trim();

        while(true){
            toEval = strng.match(/(\d+ [+*] \d+)|(\(\d+\))/);
            try{
                strng = strng.replace(toEval[0], eval(toEval[0]));
            }
            catch(e){
                values.push(Number(strng));
                break;
            }
        }
    }

    return values.reduce((a, b) => a + b);
}

function dumbDown2(){
    let values = [];
    for(let strng of input.split('\n')){
        let sub = strng.match(/\([0-9+* ]+\)/);
        strng = strng.trim();

        while(sub){
            strng = strng.replace(sub[0], addFirst(sub[0]));
            sub = strng.match(/\([0-9+* ]+\)/);
        }

        values.push(Number(addFirst(strng)));
    }

    function addFirst(equation){
        while(true){
            let toEval = equation.match(/\d+ \+ \d+/) || equation.match(/\d+ \* \d+/);
            try{
                equation = equation.replace(toEval[0], eval(toEval[0]));
            }
            catch(e){
                return equation.replace(/\(|\)/g, '');
            }
        }
    }

    return values.reduce((a, b) => a + b);
}

console.log(dumbDown());
console.log(dumbDown2());