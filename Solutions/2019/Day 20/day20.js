const fs = require('fs');

const INPUT = fs.readFileSync('input.txt').toString().trimEnd();
const SAMPLES = fs.readFileSync('sample.txt').toString().trimEnd().split(/\r?\n\r?\n/);

function listPortal(maze) {
    let rows = maze.split(/\r?\n/), portal = {};
    // listing portals in-out coordinates
    const recordPortal = ([x, y]) => {
        let port, temp, charcoor = [[x, y]], name = rows[y][x];
        
        temp = rows[y].split('');
        temp[x] = '!';
        rows[y] = temp.join('');

        for(let i = -1; i <= 1; i += 2) {
            let [tempx, tempy] = [x + i, y + i];
            if(tempx < rows[0].length && tempx >= 0) {
                if(/\w/.test(rows[y][tempx])) {
                    charcoor.push([tempx, y]);
                    name += rows[y][tempx];
                    temp = rows[y].split('');
                    temp[tempx] = '!';
                    rows[y] = temp.join('');
                    if(!port) port = [tempx + 1, y];
                } //assuming the port location, rewritten if found
                if(/\./.test(rows[y][tempx])) port = [tempx, y];
            }
            if(tempy < rows.length && tempy >= 0) {
                if(/\w/.test(rows[tempy][x])) {
                    charcoor.push([x, tempy]);
                    name += rows[tempy][x];
                    temp = rows[tempy].split('');
                    temp[x] = '!';
                    rows[tempy] = temp.join('');
                    if(!port) port = [x, tempy + 1];
                }
                if(/\./.test(rows[tempy][x])) port = [x, tempy];
            }
        }
        portal[name] = (portal[name] || []).concat(charcoor, [port]);
    }

    for(let i = 0; i < rows.length; i++) {
        let search = rows[i].search(/\w/);
        while(search >= 0) {
            recordPortal([search, i]);
            search = rows[i].search(/\w/);
        }
    }
    //end of listing in-out
    let coords = {};
    for(let [key, val] of Object.entries(portal)) coords[key] = val.map(a => coorTostring(...a));
    const whosePort = ([x, y]) => {
        for(let [key, val] of Object.entries(coords)){
            if(val.includes(coorTostring(x, y))) return key;
        }
    }

    rows = maze.split(/\r?\n/);
    let key = {};

    const traverse = ([col, row], mov = 0, visited = new Set()) => {
        let nextlookup = [
                [col, row - 1], //up
                [col + 1, row], //right
                [col, row + 1], //down
                [col - 1, row]  //left
            ],
            dir = [ //direction
                rows[row - 1][col], //up
                rows[row][col + 1], //right
                rows[row + 1][col], //down
                rows[row][col - 1]  //left
            ];

        visited.add(`${col},${row}`);
        
        for(let i = 0; i < 4; i++){
            if(/[A-Z]/.test(dir[i]) && !visited.has(coorTostring(...nextlookup[i]))) key[whosePort(nextlookup[i])] = mov + 1;
            if(dir[i] == '.' && !visited.has(coorTostring(...nextlookup[i]))) traverse(nextlookup[i], mov + 1, new Set([...visited]));
        }
        
    }

    traverse(portal['AA'][2], 0, new Set(portal['AA'].map(a => coorTostring(...a))));

    return key;
    

    // return portal;
}

function coorTostring(x, y) {
    return `${x},${y}`;
}

// console.log(SAMPLES)

console.log(listPortal(SAMPLES[0]));