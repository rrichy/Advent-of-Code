const [p1, p2] = require('fs').readFileSync('input.txt').toString().trim().split(/\r?\n\r?\n/).map(a => a.replace(/^.*:\r?\n/, '').split(/\r?\n/).map(Number));

function calcScore(){
    while(p1.length > 0 && p2.length > 0){
        let [draw1, draw2] = [p1.shift(), p2.shift()];
        if(draw1 > draw2) p1.push(draw1, draw2);
        else p2.push(draw2, draw1);
    }
    let score = p1.length ? p1.reduce((a, b, i) => a + b * (p1.length - i), 0) : p2.reduce((a, b, i) => a + b * (p2.length - i), 0);
    return `Player ${p1.length ? 1 : 2} Wins with a score of ${score}`;
}

console.log('Part 1:', calcScore());
