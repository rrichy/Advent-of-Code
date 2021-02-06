const runIntCode = require('./runIntCode.js');

const INPUT = require('fs').readFileSync('input.txt').toString().trim().split(',').map(Number);

function alignmentParameter(ASCII){
    let subASCII = [...ASCII], haltStatus = [false, 0, 0], temp = [];

    let layout = runIntCode(subASCII, 0, 0, haltStatus).reduce((a, b) => {
        if(b == 35) temp.push('#');
        else if(b == 46) temp.push(' ');
        else if(b == 10) { a.push(temp); temp = []; }
        else temp.push('?');
        return a;
    }, []);

    layout = layout.filter(a=> a.length != 0);

    temp = 0, width = layout[0].length, height = layout.length;
    for(let row = 0; row < height; row++){
        for(let col = 0; col < width; col++){
            if(layout[row][col] == '#'){
                if(row > 0 && row < height - 1 && col > 0 && layout[row + 1][col] == '#' && layout[row - 1][col] == '#'
                && layout[row][col + 1] == '#' && layout[row][col - 1] == '#') temp += row*col;
            }
        }
    }

    return temp;
}

function dustCollected(ASCII){
    let subASCII = [...ASCII], haltStatus = [false, 0, 0], layout,
        mainRoute = 'A,A,B,C,C,A,B,C,A,B'.split('').map(a=>a.charCodeAt()).concat(10),
        A = 'L,12,L,12,R,12'.split('').map(a=>a.charCodeAt()).concat(10),
        B = 'L,8,L,8,R,12,L,8,L,8'.split('').map(a=>a.charCodeAt()).concat(10),
        C = 'L,10,R,8,R,12'.split('').map(a=>a.charCodeAt()).concat(10);

    subASCII[0] = 2;
   
    layout = runIntCode(subASCII, mainRoute.concat(A, B, C, ['y'.charCodeAt(), 10]), 0, haltStatus);
    // console.log(layout.map(a=>String.fromCharCode(a)).join(''));
    // console.log();
    return layout[layout.length - 1];
}

console.log('Part 1:', alignmentParameter(INPUT));
console.log('Part 2:', dustCollected(INPUT));