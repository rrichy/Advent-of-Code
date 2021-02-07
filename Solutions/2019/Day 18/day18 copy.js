const fs = require('fs');
const { get } = require('http');

const INPUT = fs.readFileSync('input.txt').toString().trim();
const SAMPLES = fs.readFileSync('sample.txt').toString().trim().split(/\r?\n\r?\n/);

function listObtainables(tunnel){
    let subtunnel = [...tunnel], key = {}, 
        row = subtunnel.findIndex((rowItem) => /@/.test(rowItem)), col = subtunnel[row].indexOf('@');
    
    const traverse = ([col, row], mov = 0, visited = new Set()) => {
        let nextlookup = [
                [col, row - 1], //up
                [col + 1, row], //right
                [col, row + 1], //down
                [col - 1, row]  //left
            ],
            dir = [ //direction
                subtunnel[row - 1][col], //up
                subtunnel[row][col + 1], //right
                subtunnel[row + 1][col], //down
                subtunnel[row][col - 1]  //left
            ];

        visited.add(`${col},${row}`);
        
        for(let i = 0; i < 4; i++){
            if(/[a-z]/.test(dir[i])) key[dir[i]] = mov + 1;
            if(dir[i] == '.' && !visited.has(`${nextlookup[i][0]},${nextlookup[i][1]}`)) traverse(nextlookup[i], mov + 1, new Set([...visited]));
        }
        
    }

    traverse([col, row]);

    return key;
}

function minMoves(tunnel){
    let subTunnel = tunnel.split(/\r?\n/);

    const getAllKeys = (tunnel, min = Number.MAX_SAFE_INTEGER) => {
        let keys = listObtainables(tunnel);
        
        if(Object.keys(keys).length == 0) return 0;

        for(let [key, mov] of Object.entries(keys)){
            
            let subTunnel = [...tunnel], curSum = 0;
            
            subTunnel.forEach((a, i) => { 
                if(/@/.test(a)) subTunnel[i] = subTunnel[i].replace('@', '.');
                if(new RegExp(key.toUpperCase()).test(a)) subTunnel[i] = subTunnel[i].replace(key.toUpperCase(), '.');
                if(new RegExp(key).test(a)) subTunnel[i] = subTunnel[i].replace(key, '@');
            });
            console.log(keys, 'picked', key);
            console.log(subTunnel);
            console.log('\n');
            curSum = mov + getAllKeys(subTunnel, min);
            if(curSum < min) min = curSum;
        }

        return min;
    }

    return getAllKeys(subTunnel);
}

// console.log(minMoves(SAMPLES[0]));
// console.log(minMoves(SAMPLES[1]));
console.log(minMoves(SAMPLES[2]));
// console.log(minMoves(SAMPLES[3]));
// console.log(minMoves(SAMPLES[4]));
// console.log(minMoves(INPUT));