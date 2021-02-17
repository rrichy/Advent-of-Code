const fs = require('fs');

const INPUT = fs.readFileSync('input.txt').toString().trim();
const SAMPLE = fs.readFileSync('sample.txt').toString().trim();

function biodiversityRating(area) {
    let map = area.split(/\r?\n/).map(a => a.split('').map(b => b == '#' ? 1 : 0)),
        mapHistory = new Set();

    const mapBuilder = (submap) => {
        return submap.reduce((a, b) => a + b.join(''), '');
    }

    const adjBugs = (submap, col, row) => {
        return [submap[row - 1] ? submap[row - 1][col] : 0, submap[row + 1] ? submap[row + 1][col] : 0, submap[row][col - 1], submap[row][col + 1]]
                .reduce((a, b) => a + (b ? b : 0), 0);
    }

    while(true) {
        if(mapHistory.has(mapBuilder(map))) break;
        else mapHistory.add(mapBuilder(map));

        let subMap = Array(5).fill().map((a, i) => [...map[i]]);
        
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                let adj = adjBugs(subMap, j, i);

                if(subMap[i][j] == 0 && (adj == 1 || adj == 2)) map[i][j] = 1;
                else if(subMap[i][j] == 1 && (adj == 0 || adj >= 2)) map[i][j] = 0;
                else map[i][j] = subMap[i][j];
            }
        }
    }

    return map.reduce((a, b) => a.concat(b), []).reduce((a, b, i) => b ? a + 2**i : a, 0);
}

console.log('Part 1:', biodiversityRating(INPUT));
console.log('Part 2:', )