const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim().split(/\r?\n/);
const samples = fs.readFileSync('sample.txt').toString().trim().split(/\r?\n\r?\n/).map(a => a.split(/\r?\n/));

function requiredORE(reaction_list){ //an array of reactions
    let craft = craftList(reaction_list), yield = {}, requirement = {};

    for(let material in craft){
        [yield[material], requirement[material]] = craft[material];
    }

    let ores = 0, excess = {};

    const recur = (reaction, quantity = 1) => {
        if(excess[reaction] >= quantity){ excess[reaction] -= quantity; return; }
        else{ 
            quantity -= excess[reaction] || 0;
            excess[reaction] = 0;
        }

        let multiplier = Math.ceil(quantity / yield[reaction]);

        requirement[reaction].forEach(([qty, mat]) => {

            if(mat == 'ORE'){
                ores += multiplier * qty;
            }
            else{
                recur(mat, multiplier * qty, excess);
            }
        })
        excess[reaction] = (excess[reaction] || 0) + multiplier * yield[reaction] - quantity;
        
        return ores;
    }
    
    return recur('FUEL');;
}

function fuelYield(reaction_list, supply_ores){
    let craft = craftList(reaction_list), yield = {}, requirement = {};

    for(let material in craft){
        [yield[material], requirement[material]] = craft[material];
    }

    let ores = 0, excess = {}, fuel = 0;

    const recur = (reaction, quantity = 1) => {
        if(excess[reaction] >= quantity){ excess[reaction] -= quantity; return; }
        else{ 
            quantity -= excess[reaction] || 0;
            excess[reaction] = 0;
        }

        let multiplier = Math.ceil(quantity / yield[reaction]);

        requirement[reaction].forEach(([qty, mat]) => {

            if(mat == 'ORE'){
                ores += multiplier * qty;
            }
            else{
                recur(mat, multiplier * qty);
            }
        })
        excess[reaction] = (excess[reaction] || 0) + multiplier * yield[reaction] - quantity;
        
        return ores;
    }
    recur('FUEL', 1);
    
    let lcm = getLCM(...Object.values(excess).filter(a => a != 0)), base_ore = Math.ceil(supply_ores / ores);
    
    for(let multiplier = 1;; multiplier++){
        ores = 0;
        excess = {};
        fuel = base_ore + lcm * multiplier;
        recur('FUEL', fuel);
        if(ores > supply_ores) break;
    }
    
    return Math.floor(fuel * (supply_ores / ores));
}

function getLCM(){
    let numbers = Object.values(arguments), base = Math.max(...numbers),
        primes = generatePrimeList(base), factors = Array(numbers.length).fill().map(_=>[]);

    for(let i = 0; i < numbers.length; i++){
        for(let prime = 0; prime < primes.length; prime++){
            while(numbers[i] % primes[prime] == 0){
                factors[i].push(primes[prime])
                numbers[i] /= primes[prime];
            }
            if(numbers[i] == 1) break;
        }
    }

    let max = Math.max(...factors.map(a => a.length)), final_factor = [];
    for(let i = 0; i < max; i++){
        let temp = factors.map(a => a[i]);
        final_factor.push(...temp.filter((a, index) => index == temp.indexOf(a) && a != undefined));
    }

    return final_factor.reduce((a, b) => a * b, 1);
}

function generatePrimeList(number){
    let temp = Array(number - 1).fill().map((_,i) => i + 2);

    for(let i = 0; i < temp.length; i++){
        temp = temp.filter(a => a % temp[i] != 0 || a == temp[i]);
    }

    return temp;
}

function craftList(reactions){
    let craft = {};

    for(let reaction of reactions){ //creates the crafting list
        let [materials, yield] = reaction.split(' => '), output = [], req_list = [];

        let [yield_num, yield_name] = yield.split(' ');
        
        output.push(Number(yield_num));
        for(let material of materials.split(', ')){
            let [mat_num, mat_name] = material.split(' ');
            req_list.push([Number(mat_num), mat_name]);
        }
        output.push(req_list);

        craft[yield_name] = output;
    }

    return craft;
}

console.log('Part 1:', requiredORE(input));
console.log('Part 2:', fuelYield(input, 1000000000000));