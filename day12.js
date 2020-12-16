function manhattanDistance(){
    const actions = $('pre').innerText.trim().split('\n');

    let direction = {'N': 0, 'S': 0, 'E': 0, 'W': 0},
        rotation ={'N': ['E', 'S', 'W'], 'S': ['W', 'N', 'E'], 'E': ['S', 'W', 'N'], 'W': ['N', 'E', 'S']},
        current = 'E';

    for(let action of actions){
        let [, dir, val] = action.match(/([A-Z])(\d+)/);
        val = parseInt(val);

        if(dir == 'F'){
            direction[current] += val;
        }
        else if(dir == 'R'){
            current = rotation[current][val % 90];
        }
        else{
            direction[dir] += val;
        }
    }
    
    return Math.abs(direction['N'] - direction['S']) + Math.abs(direction['E'] - direction['W']);
}

console.log(manhattanDistance());