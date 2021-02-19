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

function recursiveBugs(area) {
    let map = area.split(/\r?\n/).map(a => a.split('').map(b => b == '#' ? 1 : 0)),
        mapLevels = new Map([[0, [...map]]]), lowest = 0, highest = 0,
        blankLevel = Array(5).fill().map(_ => [0,0,0,0,0]);

    const adjBugs = (level, col, row, inner = null, outer = null) => {
        if(row == 0) {
            return [outer ? outer[1][2] : 0, level[row + 1][col], level[row][col - 1], level[row][col + 1], (col == 0 && outer) ? outer[2][1] : 0, (col == 4 && outer) ? outer[2][3] : 0]
                .reduce((a, b) => a + (b ? b : 0), 0);
        }
        else if(row == 4) {
            return [level[row - 1][col], outer ? outer[3][2] : 0, level[row][col - 1], level[row][col + 1], (col == 0 && outer) ? outer[2][1] : 0, (col == 4 && outer) ? outer[2][3] : 0]
                .reduce((a, b) => a + (b ? b : 0), 0);
        }
        else if(col == 0) {
            return [level[row - 1][col], level[row + 1][col], outer ? outer[2][1] : 0, level[row][col + 1]]
                .reduce((a, b) => a + (b ? b : 0), 0);
        }
        else if(col == 4) {
            return [level[row - 1][col], level[row + 1][col], level[row][col - 1], outer ? outer[2][3] : 0]
                .reduce((a, b) => a + (b ? b : 0), 0);
        }
        else if((row == 1 && col == 1) || (row == 1 && col == 3) || (row == 3 && col == 1) || (row == 3 && col == 3)){
            return [level[row - 1][col], level[row + 1][col], level[row][col - 1], level[row][col + 1]]
                .reduce((a, b) => a + (b ? b : 0), 0);
        }
        else if(row == 1 && col == 2) {
            return [level[row - 1][col], ...(inner ? inner[0] : [0]), level[row][col - 1], level[row][col + 1]]
                .reduce((a, b) => a + (b ? b : 0), 0);
        }
        else if(row == 3 && col == 2) {
            return [...(inner ? inner[4] : [0]), level[row + 1][col], level[row][col - 1], level[row][col + 1]]
                .reduce((a, b) => a + (b ? b : 0), 0);
        }
        else if(row == 2 && col == 1) {
            return [level[row - 1][col], level[row + 1][col], level[row][col - 1], ...(inner ? inner.reduce((acc, b) => acc.concat(b[0]), []) : [0])]
                .reduce((a, b) => a + (b ? b : 0), 0);
        }
        else {
            return [level[row - 1][col], level[row + 1][col], ...(inner ? inner.reduce((acc, b) => acc.concat(b[4]), []) : [0]), level[row][col + 1]]
                .reduce((a, b) => a + (b ? b : 0), 0);
        }
    }

    
    for(let time = 0; time < 200; time++) {
        if(mapLevels.get(lowest).some(a => a.includes(1))) lowest--;
        if(mapLevels.get(highest).some(a => a.includes(1))) highest++;
        mapLevels.set(lowest, JSON.parse(JSON.stringify(blankLevel)));
        mapLevels.set(highest, JSON.parse(JSON.stringify(blankLevel)));

        //deep cloning all levels
        let subLevels = new Map();
        mapLevels.forEach((val, key) => {
            subLevels.set(key, Array(5).fill().map((_,i) => [...val[i]]));
        });


        for(let i = lowest; i <= highest; i++) {
            let current = mapLevels.get(i), subMap = subLevels.get(i),
                inner = i == highest ? null : subLevels.get(i + 1), 
                outer = i == lowest ? null : subLevels.get(i - 1);
                
            for(let i = 0; i < 5; i++){
                for(let j = 0; j < 5; j++){
                    if(i == 2 && j == 2) continue;
                    let adj = adjBugs(subMap, j, i, inner, outer);
                    
                    if(subMap[i][j] == 0 && (adj == 1 || adj == 2)) current[i][j] = 1;
                    else if(subMap[i][j] == 1 && (adj == 0 || adj >= 2)) current[i][j] = 0;
                    else current[i][j] = subMap[i][j];
                }
            }
        }
    }
    
    let bugs = 0;
    mapLevels.forEach((val, key) => {
        bugs += val.reduce((acc, row) => acc + row.filter(Boolean).length, 0);
    });

    return bugs;
}

console.log('Part 1:', biodiversityRating(INPUT));
console.log('Part 2:', recursiveBugs(INPUT));