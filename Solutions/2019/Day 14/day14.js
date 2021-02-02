const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim().split(/\r?\n/);
const samples = fs.readFileSync('sample.txt').toString().trim().split(/\r?\n\r?\n/).map(a => a.split(/\r?\n/));

function requiredORE(reactions){ //an array of reactions
    let craft = craftList(reactions), yield = {}, requirement = {}, basic = [], list = {};

    for(let material in craft){
        [yield[material], requirement[material]] = craft[material];
        if(requirement[material][0][1] == 'ORE') basic.push(material)
    }

    let excess = {}, ores = 0;

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

        return ores
    }

    return recur('FUEL')
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