const input = require('fs').readFileSync('input.txt').toString().trim();

function fuelRequirement(list){     // part 1
    return list.split(/\r?\n/).reduce((acc, mass) => acc + (Math.floor(mass / 3) - 2), 0);
}

function correctedFuelReq(list){    // part 2
    let recur = (mass, acc = 0) => {
        let req = Math.floor(mass / 3) - 2;
        
        if(req > 0) acc += req + recur(req);
        return acc;
    }

    return list.split(/\r?\n/).reduce((acc, mass) => acc + recur(mass), 0);
}



console.log('Part 1:', fuelRequirement(input));
console.log('Part 2:', correctedFuelReq(input));