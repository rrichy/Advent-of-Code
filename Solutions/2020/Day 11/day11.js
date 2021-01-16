function seatOccupied(){
    const layout = $('pre').innerText.trim().split('\n').map(a => a.split(''));
    let current = JSON.parse(JSON.stringify(layout)), prev;
    //part 1
    do{
        prev = JSON.parse(JSON.stringify(current));
        current = Array(layout.length).fill().map(a => []);

        for(let row = 0; row < prev.length; row++){
            for(let col = 0; col < prev[0].length; col++){
                if(prev[row][col] == 'L'){
                    if(checkAdjacent(prev, col, row) == 0) current[row][col] = '#';
                    else current[row][col] = 'L';
                }
                else if(prev[row][col] == '#'){
                    if(checkAdjacent(prev, col, row) >= 4) current[row][col] = 'L';
                    else current[row][col] = '#';
                }
                else current[row][col] = '.';
            }
        }
    }
    while(JSON.stringify(current) != JSON.stringify(prev));

    //part 2
    let current2 = JSON.parse(JSON.stringify(layout)), temp = [];
    do{
        prev = JSON.parse(JSON.stringify(current2));
        current2 = Array(layout.length).fill().map(a => []);
        temp = Array(layout.length).fill().map(a => []);

        for(let row = 0; row < prev.length; row++){
            for(let col = 0; col < prev[0].length; col++){
                if(prev[row][col] == 'L'){
                    if(visibleAdjacent(prev, col, row) == 0) current2[row][col] = '#';
                    else current2[row][col] = 'L';
                }
                else if(prev[row][col] == '#'){
                    if(visibleAdjacent(prev, col, row) >= 5) current2[row][col] = 'L';
                    else current2[row][col] = '#';
                }
                else current2[row][col] = '.';
            }
        }
    }
    while(JSON.stringify(current2) != JSON.stringify(prev));

    return [current.reduce((a, b) => a.concat(b), []).filter(a => a == '#').length, current2.reduce((a, b) => a.concat(b), []).filter(a => a == '#').length];
}

function checkAdjacent(arr, x, y){
    let result = [];
    for(let y1 = -1; y1 <= 1; y1++){
        for(let x1 = -1; x1 <= 1; x1++){
            if(y1 == 0 && x1 == 0) continue;
            if(!arr[y + y1]) result.push('.');
            else result.push(arr[y + y1][x + x1] || '.');
        }
    }
    return result.filter(b => b == '#').length;
}

function visibleAdjacent(arr, x, y){
    let counter = [1, 1], arrays = [];
    let dir = {
        '1': function() {return arr[y][x + counter[0]]},
        '2': function() {return arr[y][x - counter[0]]},
        '3': function() {return arr[y - counter[1]][x]},
        '4': function() {return arr[y + counter[1]][x]},
        '5': function() {return arr[y - counter[1]][x - counter[0]]},
        '6': function() {return arr[y + counter[1]][x - counter[0]]},
        '7': function() {return arr[y - counter[1]][x + counter[0]]},
        '8': function() {return arr[y + counter[1]][x + counter[0]]}
    }

    for(let next in dir){
        let temp;
        while(true){
            try{
                temp = dir[next]();
                if(temp == 'L' || temp == '#'){
                    arrays.push(temp);
                    counter = [1, 1];
                    break;
                }
                else if( temp == '.'){
                    counter[0]++; counter[1]++;
                }
                else{
                    throw e;
                }
            }
            catch(e){
                counter = [1, 1];
                break;
            }
        }
    }

    return arrays.filter(a => a == '#').length;
}


let seats = seatOccupied();
console.log('Seat Occupied:', seats[0], seats[1]);