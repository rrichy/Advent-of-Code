const input = require('fs').readFileSync('input.txt').toString().trim().split(/\r?\n/).map(a => a.split('x').map(Number));

function requiredWrap(dimensions){
    return dimensions
        .reduce((total, dim) => {
            let lw = dim[0] * dim[1], wh = dim[0] * dim[2], hl = dim[1] * dim[2];
            return total + 2 * (lw + wh + hl) + Math.min(lw, wh, hl);
        }, 0);
}

function requiredRibbon(dimensions){
    return dimensions
        .reduce((total, dim) => {
            let lw = dim[0] + dim[1], wh = dim[0] + dim[2], hl = dim[1] + dim[2];
            return total + 2 * Math.min(lw, wh, hl) + dim.reduce((vol, d) => vol * d, 1);
        }, 0);
}

console.log('Part 1:', requiredWrap(input));
console.log('Part 2:', requiredRibbon(input));