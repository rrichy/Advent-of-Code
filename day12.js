function manhattanDistance(part){
    const actions = $('pre').innerText.trim().split('\n');

    let direction = {'N': 0, 'S': 0, 'E': 0, 'W': 0},
        rotation ={'N': ['E', 'S', 'W'], 'S': ['W', 'N', 'E'], 'E': ['S', 'W', 'N'], 'W': ['N', 'E', 'S']};

    if(part === 1){
        let current = 'E';

        for(let action of actions){
            let [, dir, val] = action.match(/([A-Z])(\d+)/);
            val = parseInt(val);

            if(dir == 'F'){
                direction[current] += val;
            }
            else if(dir == 'R'){
                current = rotation[current][val / 90 - 1];
            }
            else if(dir == 'L'){
                current = rotation[current][3 - val / 90];
            }
            else{
                direction[dir] += val;
            }
        }

        return Math.abs(direction['N'] - direction['S']) + Math.abs(direction['E'] - direction['W']);
    }
    
    else if(part === 2){
        let waypoint = {'N': 1, 'S': 0, 'E': 10, 'W': 0};
        
        for(let action of actions){
            let [, dir, val] = action.match(/([A-Z])(\d+)/), temp = {};
            val = parseInt(val);

            if(dir == 'F'){
                Object.keys(waypoint).forEach(a => direction[a] += val * waypoint[a]);
            }
            else if(dir == 'R'){
                /*
                {'N': 1, 'S': 0, 'E': 10, 'W': 0};
                R90 => {'N': 0, 'S': 10, 'E': 1, 'W': 0}
                */
                Object.keys(waypoint).forEach(a => {
                    temp[rotation[a][val / 90 - 1]] = waypoint[a];
                });

                waypoint = Object.assign(waypoint, temp);
            }
            else if(dir == 'L'){
                /*
                {'N': 1, 'S': 0, 'E': 10, 'W': 0};
                L90 => {'N': 10, 'S': 0, 'E': 0, 'W': 1}
                */
               Object.keys(waypoint).forEach(a => {
                    temp[rotation[a][3 - val / 90]] = waypoint[a];
                });

                waypoint = Object.assign(waypoint, temp);
            }
            else{
                waypoint[dir] += val;
            }
        }
        
        return Math.abs(direction['N'] - direction['S']) + Math.abs(direction['E'] - direction['W']);
    }
}

console.log('Part 1:', manhattanDistance(1));
console.log('Part 2:', manhattanDistance(2));