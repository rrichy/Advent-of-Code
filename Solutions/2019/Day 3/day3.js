const input = require('fs').readFileSync('input.txt').toString().trim().split(/\r?\n/);
const samples = require('fs').readFileSync('sample.txt').toString().trim().split(/\r?\n\r?\n/).map(a => a.split(/\r?\n/));

function nearestIntersection(movements){
    let [path_1, path_2] = movements.map(path => path.split(',')),
        [x, y] = [0, 0], record = new Set(), intersection = [],
        trail = {
            'R': () => x++,
            'L': () => x--,
            'U': () => y++,
            'D': () => y--
        };
    
    // R +, L -, U +, D -
    for(let i = 0; i < path_1.length; i++){
        let [,dir, mag] = path_1[i].match(/([RLUD])(\d+)/);
        mag = Number(mag);
        
        for(let j = 0; j < mag; j++){
            trail[dir]();
            record.add(`${x}, ${y}`);
        }
    }

    [x, y] = [0, 0];

    for(let i = 0; i < path_2.length; i++){
        let [,dir, mag] = path_2[i].match(/([RLUD])(\d+)/);
        mag = Number(mag);
        
        for(let j = 0; j < mag; j++){
            trail[dir]();
            if(record.has(`${x}, ${y}`)) intersection.push(Math.abs(x) + Math.abs(y));
        }
    }

    return Math.min(...intersection);
}

function nearestSteps(movements){
    let [path_1, path_2] = movements.map(path => path.split(',')),
        [x, y] = [0, 0], record = new Map(), steps = 0, intersection = [],
        trail = {
            'R': () => x++,
            'L': () => x--,
            'U': () => y++,
            'D': () => y--
        };
    
    // R +, L -, U +, D -
    for(let i = 0; i < path_1.length; i++){
        let [,dir, mag] = path_1[i].match(/([RLUD])(\d+)/);
        mag = Number(mag);
        
        for(let j = 0; j < mag; j++){
            trail[dir]();
            record.set(`${x}, ${y}`, ++steps);
        }
    }

    steps = 0;
    [x, y] = [0, 0];

    for(let i = 0; i < path_2.length; i++){
        let [,dir, mag] = path_2[i].match(/([RLUD])(\d+)/);
        mag = Number(mag);
        
        for(let j = 0; j < mag; j++){
            steps++;
            trail[dir]();
            if(record.has(`${x}, ${y}`)) intersection.push(record.get(`${x}, ${y}`) + steps);
        }
    }

    return Math.min(...intersection);
}
// console.log(nearestSteps(samples[0]));
// console.log(nearestSteps(samples[1]));
// console.log(nearestSteps(samples[2]));
console.log('Part 1:', nearestIntersection(input));
console.log('Part 2:', nearestSteps(input));