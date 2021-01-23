const fs = require('fs');
const input = fs
    .readFileSync('input.txt')
    .toString().trim().split(/\r?\n/);
const sample = fs
    .readFileSync('sample.txt')
    .toString().trim().split(/\r?\n/);


function bestStationVisibility(input){
    let asteroids = [], max = 0, station;
    
    input.forEach((a, row) => a.split('')
        .forEach((b, col) => {
            if(b == '#') asteroids.push([col, row]);
        })
    );

    asteroids.forEach(coordinate => {
        let visible = getVisible(asteroids, ...coordinate);
        if(visible > max) [max, station] = [visible, coordinate];
    });

    return [max, station];
}

function getSlope(point1, point2){
    return (point2[1] - point1[1]) / (point2[0] - point1[0]);
}

function getDistance(point1, point2){
    return Math.sqrt((point2[1] - point1[1])**2 + (point2[0] - point1[0])**2);
}

function getVisible(asteroids, x_origin, y_origin){
    let [up, down, left, right] = [0, 0, new Set(), new Set()];
    
    asteroids.forEach(([x, y]) => {
        if(x_origin == x && y_origin == y) return; // skip asteroid_origin
        else if(x_origin == x && y > y_origin) up = 1; // denominator will be inifity; just look up
        else if(x_origin == x && y < y_origin) down = 1; // denominator will be inifity; just look down
        else x - x_origin > 0 ? right.add(getSlope([x_origin, y_origin], [x, y])) : left.add(getSlope([x_origin, y_origin], [x, y])); // store according to direction
    });

    return left.size + right.size + up + down;
}


function vaporizedOrder(input, base, order = 200){
    let right_asteroids = new Map(), left_asteroids = new Map(), above_asteroids = [], below_asteroids = [];
    
    input.forEach((a, row) => a.split('')
        .forEach((b, col) => {
            let temp = getSlope(base, [col, row]);
            if(b == '#'){
                if(col > base[0]){
                    if(right_asteroids.has(temp)) right_asteroids.set(temp, [...right_asteroids.get(temp), [col, row]]); /*  right_asteroids[temp].push([col, row]); */
                    else right_asteroids.set(temp, [[col, row]]);
                }
                if(col < base[0]){
                    if(left_asteroids.has(temp))  left_asteroids.set(temp, [...left_asteroids.get(temp), [col, row]]);
                    else left_asteroids.set(temp, [[col, row]]);
                }
                if(col == base[0] && row > base[1]) below_asteroids.push([col, row]);
                if(col == base[0] && row < base[1]) above_asteroids.push([col, row]);
            }
        })
    );

    for(let [key, entries] of right_asteroids.entries()) right_asteroids.set(key, entries.sort((a, b) => getDistance(a, base) - getDistance(b, base)));
    for(let [key, entries] of left_asteroids.entries()) left_asteroids.set(key, entries.sort((a, b) => getDistance(a, base) - getDistance(b, base)));

    right_asteroids = new Map(Array.from(right_asteroids).sort((a, b) => a[0] - b[0]));
    left_asteroids = new Map(Array.from(left_asteroids).sort((a, b) => a[0] - b[0]));
    above_asteroids.sort((a, b) => b[1] - a[1]);
    below_asteroids.sort((a, b) => a[1] - b[1]);
    
    let last_vaporized, nth_vaporized, i = 0;
    while(i < order){
        if(above_asteroids.length){
            last_vaporized = above_asteroids.shift();
            i++;
            if(i == order) nth_vaporized = last_vaporized;
        }
        for(let [slope, entries] of right_asteroids.entries()){
            if(entries.length){
                last_vaporized = entries.shift();
                i++;
                if(i == order) nth_vaporized = last_vaporized;
            }
        }
        if(below_asteroids.length){
            last_vaporized = below_asteroids.shift();
            i++;
            if(i == order) nth_vaporized = last_vaporized;
        }
        for(let [slope, entries] of left_asteroids.entries()){
            if(entries.length){
                last_vaporized = entries.shift();
                i++;
                if(i == order) nth_vaporized = last_vaporized;
            }
        }
    }

    return 100 * nth_vaporized[0] + nth_vaporized[1];
}

let [visible, base] = bestStationVisibility(input);

console.log('Part 1:', visible);
console.log('Part 2:', vaporizedOrder(input, base));