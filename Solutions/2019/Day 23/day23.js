const runIntCode = require('./runIntCode.js');

const INPUT = require('fs').readFileSync('input.txt').toString().trim().split(',').map(Number);

function Ypacket255(NIC) {
    const COMPUTERS = Array(50).fill().map((_,i) => {
        return {
            run: [...NIC],
            input: [i],
            haltStatus: [false, 0, 0]
        }
    });
    let address, X, Y;
    for(let i = 0;; i++){
        if(i >= 50) i = 0;
        let { run, input, haltStatus } = COMPUTERS[i];
        if(!input.length) input.push(-1);
        [address, X, Y] = runIntCode(run, input, 3, haltStatus);
        // console.log(COMPUTERS[i].input, 'computer ', i);
        if(address && X && Y){
            if(address == 255){ break; }
            COMPUTERS[address].input.push(X, Y);
            // console.log(COMPUTERS[address].input);
            i = address - 1;
        }
    }
    return Y;
}

function NATPacket(NIC) {
    const COMPUTERS = Array(50).fill().map((_,i) => {
        return {
            run: [...NIC],
            input: [i],
            haltStatus: [false, 0, 0]
        }
    });
    let address, X, Y, NAT = [], natHistory = new Set();
    for(let i = 0;; i++){
        if(COMPUTERS.every(computer => computer.input.length == 0) && NAT.length){
            COMPUTERS[0].input.push(...NAT);
            if(natHistory.has(NAT[1])) return NAT[1];
            natHistory.add(NAT[1]);
        }
        if(i >= 50) i = 0;
        let { run, input, haltStatus } = COMPUTERS[i];
        if(!input.length) input.push(-1);
        [address, X, Y] = runIntCode(run, input, 3, haltStatus);
        // if(COMPUTERS[i].input.length) console.log(COMPUTERS[i].input, 'computer ', i);
        if(address && X && Y){
            if(address == 255) NAT = [X, Y];
            else COMPUTERS[address].input.push(X, Y);
            i = address - 1;
        }
    }
}

console.log('Part 1:', Ypacket255(INPUT));
console.log('Part 2:', NATPacket(INPUT));