const input = '124075-580769';

function validPass_1(pass){
    if(!/00|11|22|33|44|55|66|77|88|99/.test(pass)) return false;
    for(let i = 1; i < pass.length; i++){
        if(pass[i] < pass[i - 1]) return false;
    }
    return true;
}

function validPass_2(pass){
    if(!/(?:^|(.)(?!\1))(\d)\2(?!\2)/.test(pass)) return false;
    for(let i = 1; i < pass.length; i++){
        if(pass[i] < pass[i - 1]) return false;
    }
    return true;
}

function countValid_1(range){
    range = range.split('-').map(Number);
    
    return Array(range[1] - range[0] + 1).fill().filter((_, i) => validPass_1(String(i + range[0]))).length;
}

function countValid_2(range){
    range = range.split('-').map(Number);
    
    return Array(range[1] - range[0] + 1).fill().filter((_, i) => validPass_2(String(i + range[0]))).length;
}

console.log('Part 1:', countValid_1(input));
console.log('Part 2:', countValid_2(input));