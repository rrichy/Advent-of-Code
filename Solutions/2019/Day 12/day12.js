const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim();
const sample1 = fs.readFileSync('sample1.txt').toString().trim();
const sample2 = fs.readFileSync('sample2.txt').toString().trim();

function simulateStep(position, velocity){    //once only. [pos0, [x, y, z,]], [vel0, [x, y, z]]
    let sub_position = [...position],
        num_moon = position.length;

    for(let i = 0; i < num_moon; i++){
        let origin = position[i],
            temp = sub_position.reduce((a, b) => {
                if(origin < b) return a + 1;
                else if(origin > b) return a - 1;
                else return a;
            }, 0);

        position[i] += temp + velocity[i];
        velocity[i] += temp;
    }

    return;
}

function totalSystemEnergy(initialPosition, steps){
    let x_position = [], x_velocity = [0, 0, 0, 0],
        y_position = [], y_velocity = [0, 0, 0, 0],
        z_position = [], z_velocity = [0, 0, 0, 0],
        total = 0;

    initialPosition.split(/\r?\n/).forEach(moon => {
        let temp = moon.match(/-?\d+/g).map(Number);
        x_position.push(temp[0]);
        y_position.push(temp[1]);
        z_position.push(temp[2]);
    });

    for(let i = 0; i < steps; i++){
        simulateStep(x_position, x_velocity);
        simulateStep(y_position, y_velocity);
        simulateStep(z_position, z_velocity);
    }

    for(let i = 0; i < 4; i++)
        total += (Math.abs(x_position[i]) + Math.abs(y_position[i]) + Math.abs(z_position[i])) * (Math.abs(x_velocity[i]) + Math.abs(y_velocity[i]) + Math.abs(z_velocity[i]));

    return total;
}

function getLCM(){
    let numbers = Object.values(arguments), min = Math.min(...numbers),
        primes = generatePrimeList(min), factors = Array(numbers.length).fill().map(_=>[]);

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

function findReset(initialPosition){
    let x_position = [], x_velocity = [0, 0, 0, 0],
        y_position = [], y_velocity = [0, 0, 0, 0],
        z_position = [], z_velocity = [0, 0, 0, 0];

    initialPosition.split(/\r?\n/).forEach(moon => {
        let temp = moon.match(/-?\d+/g).map(Number);
        x_position.push(temp[0]);
        y_position.push(temp[1]);
        z_position.push(temp[2]);
    });

    let sub_x = JSON.stringify(x_position), sub_vx = JSON.stringify(x_velocity), x,
        sub_y = JSON.stringify(y_position), sub_vy = JSON.stringify(y_velocity), y,
        sub_z = JSON.stringify(z_position), sub_vz = JSON.stringify(z_velocity), z;

    for(let i = 0;; i++){
        simulateStep(x_position, x_velocity);
        simulateStep(y_position, y_velocity);
        simulateStep(z_position, z_velocity);
        
        if(sub_x == JSON.stringify(x_position) && sub_vx == JSON.stringify(x_velocity) && !x) x = i + 1;
        if(sub_y == JSON.stringify(y_position) && sub_vy == JSON.stringify(y_velocity) && !y) y = i + 1;
        if(sub_z == JSON.stringify(z_position) && sub_vz == JSON.stringify(z_velocity) && !z) z = i + 1;
        
        if(x && y && z) break;
    }

    return getLCM(x, y, z);
}

console.log('Part 1:', totalSystemEnergy(input, 1000));
console.log('Part 2:', findReset(input));