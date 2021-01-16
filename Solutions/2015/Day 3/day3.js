const input = require('fs').readFileSync('input.txt').toString().trim();

function countVisited(directions){
    let [x, y] = [0, 0], visits = new Set([JSON.stringify([x, y])]);
    let dir = {'>': () => x++, '<': () => x--, 'v': () => y++, '^': () => y--};

    for(let i = 0; i < directions.length; i++){
        dir[directions[i]]();
        visits.add(JSON.stringify([x, y]));
    }

    return visits.size;
}

function withRoboSanta(directions){
    let [x, y, x1, y1] = [0, 0, 0, 0], visits = new Set([JSON.stringify([x, y])]);
    let dir = {'>': () => x++, '<': () => x--, 'v': () => y++, '^': () => y--},
        dir1 = {'>': () => x1++, '<': () => x1--, 'v': () => y1++, '^': () => y1--};

    for(let i = 0; i < directions.length; i++){
        if(i % 2 === 0){
            dir[directions[i]]();
            visits.add(JSON.stringify([x, y]));
        }
        else{
            dir1[directions[i]]();
            visits.add(JSON.stringify([x1, y1]));
        }
    }

    return visits.size;
}

console.log('Part 1:', countVisited(input));
console.log('Part 2:', withRoboSanta(input));