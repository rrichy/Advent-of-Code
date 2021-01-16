const input = require('fs').readFileSync('input.txt').toString().trim();

function findValid(withRestriction = 0){
    let individuals = input.split(/\r?\n\r?\n/), numValids = 0;

    for(let doc of individuals){
        let docs = doc.match(/(byr|iyr|eyr|hgt|hcl|ecl|pid):(#?\w+)/g);

        if(!withRestriction && docs.length == 7) numValids++;
        if(withRestriction && docs.length == 7){
            if(docs.every(doc => inRange(...doc.split(':')))) numValids++;
        }
    }

    function inRange(type, value){
        if(type == 'byr') return value.length == 4 && value >= 1920 && value <= 2002;
        else if(type == 'iyr') return value.length == 4 && value >= 2010 && value <= 2020;
        else if(type == 'eyr') return value.length == 4 && value >= 2020 && value <= 2030;
        else if(type == 'hgt'){
            let unit = value.match(/(cm|in)/g);

            if(!unit) return false;
            
            value = value.slice(0, -2);
            if(unit[0] == 'cm')
                return value >= 150 && value <= 193;
            else
                return value >= 59 && value <= 76;
        }
        else if(type == 'hcl') return /^#[0-9a-f]{6}$/.test(value);
        else if(type == 'ecl') return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(a => a == value);
        else if(type == 'pid') return /^[0-9]{9}$/.test(value);
        else return false;
    }

    return numValids;
}

console.log(findValid());
console.log(findValid(1));