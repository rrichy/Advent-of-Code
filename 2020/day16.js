const fs = require('fs');

const input = fs.readFileSync('day16-input.txt').toString();
const [rawRules, myTicket, nearTicket] = input.trim().split('\n\n');
let rules = {}, validTickets = [], mehTicket = myTicket.split(':\n').pop().split(',').map(Number);

for(let rawRule of rawRules.split('\n')){
    let [field, ranges] = rawRule.split(': ');
    rules[field] = ranges.split(' or ').map(a => a.split('-').map(Number) );
}

//console.log(rules);

//PART 1 -- START
function sumInvalid(){
    let validRanges = Object.values(rules).reduce((a, b) => a.concat(b), []), invalids = [];
    
    for(let ticket of nearTicket.split('\n').slice(1)){
        let isValid = ticket.split(',').every(value => {
            let temp = validRanges.some(range => inRange(range, Number(value)) );
            
            if(temp == false){
                invalids.push(Number(value) );
                return false;
            }
            else{
                return true;
            }
        });

        if(isValid) validTickets.push(ticket.split(',').map(Number) );
    }

    return invalids.reduce((a, b) => a + b);
}
//PART 1 -- END

//PART 2 -- START
function findFields(){
    let possibleFields = Array(validTickets[0].length).fill().map((_, index) => Object.keys(rules));

    for(let i = 0; i < validTickets[0].length; i++){
        let transposed = getColumn(validTickets, i); //array

        transposed.forEach(value => {
            let tempFields = [];
            for(let rule in rules){
                if(inRange(rules[rule][0], value) || inRange(rules[rule][1], value)){
                    tempFields.push(rule);
                }
            }

            possibleFields[i] = possibleFields[i].filter(field => tempFields.includes(field));
        });
    }

    let fields = Array(validTickets[0].length).fill();
    while(fields.some(a => a == undefined)){
        let final = possibleFields.find(fields => fields.length == 1)[0];
        let finalIndex = possibleFields.findIndex(fields => fields.length == 1);

        fields[finalIndex] = final;

        possibleFields.forEach((fields, index) => {
            possibleFields[index] = fields.filter(a => a != final);
        });
    }

    let nums = 1;
    fields.forEach((field, index) => {
        if(/departure/.test(field)) nums *= mehTicket[index];
    });

    return nums
}
//PART 2 -- END


function inRange(range, value){
    return value >= range[0] && value <= range[1];
}

function getColumn(array, col){
    return array.map(a => a[col]);
}

console.log(sumInvalid());
console.log(findFields());