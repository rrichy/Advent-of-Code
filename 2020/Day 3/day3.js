const input = require('fs').readFileSync('input.txt').toString().trim();

function tobogganRun(right, down){
    let area = input.split(/\r?\n/);
    let [x, y] = [0, 0], trees = 0;

    while(true){
        x = (x + right) % area[0].length;
        y += down;

        if(y >= area.length) return trees;
        if(area[y][x] == '#') trees++;        
    }
}

console.log('Part 1:', tobogganRun(3,1));
console.log('Part 2:', [[1,1], [3,1], [5,1], [7,1], [1,2]].reduce((basket, value) => basket * tobogganRun(...value), 1));