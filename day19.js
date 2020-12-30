const input = require('fs').readFileSync('day19-sample2.txt').toString().trim().split('\r\n\r\n');
let rules = {};

function firstRule(){
    for(let rule of input[0].split('\r\n')){
        let [key, val] = rule.split(': ');

        if(/[a-z]/.test(val)){
            rules[key] = function() {return new RegExp(val.match(/[a-z]/)[0])};
        }
        else if(key == '0'){
            rules[key] = function() {return new RegExp('^(' + val.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')$')};
        }
        else{
            rules[key] = function() {return new RegExp('(' + val.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')};
        }
    }

    return input[1].split('\r\n').filter(a => rules[0]().test(a)).length;
}

function secondRule(){
    rules = {};

    for(let rule of input[0].split('\r\n')){
        let [key, val] = rule.split(': ');

        if(/[a-z]/.test(val)){
            rules[key] = function() {return new RegExp(val.match(/[a-z]/)[0])};
        }
        else if(key == '0'){
            rules[key] = function() {return new RegExp('^(' + val.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')$')};
        }
        else if(key == '8'){
            rules[key] = function() {return new RegExp('(' + '42 | 42 8'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')};
        }
        else if(key == '1'){
            rules[key] = function() {return new RegExp('(' + '42 31 | 42 11 31'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')};
        }
        else{
            rules[key] = function() {return new RegExp('(' + val.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')};
        }
    }

    return input[1].split('\r\n').filter(a => rules[0]().test(a)).length;
}

//rules['8'] = function() {return new RegExp('(' + '42 | 42 8'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')};
//rules['11'] = function() {return new RegExp('(' + '42 31 | 42 11 31'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')};




console.log(firstRule());
console.log(secondRule());
/*
0: 4 1 5 == 
1: 2 3 | 3 2 == [aaab, aaba, bbab, bbba], [abaa, abbb, baaa, babb]
2: 4 4 | 5 5 == aa, bb
3: 4 5 | 5 4 == ab, ba
4: "a" == return "a"
5: "b" == return "b"


let rules = {}
rules[5] = function() {return new RegExp('b')}
rules[4] = function() {return new RegExp('a')}
rules[3] = function() {return new RegExp('(' + '4 5 | 5 4'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')}
rules[2] = function() {return new RegExp('(' + '4 4 | 5 5'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')}
rules[1] = function() {return new RegExp('(' + '2 3 | 3 2'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')}
rules[0] = function() {return new RegExp('(' + '4 1 5'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')}

let rules = {}
rules['0'] = function() {return new RegExp('(' + '4 1 5'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')}
rules['1'] = function() {return new RegExp('(' + '2 3 | 3 2'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')}
rules['2'] = function() {return new RegExp('(' + '4 4 | 5 5'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')}
rules['3'] = function() {return new RegExp('(' + '4 5 | 5 4'.split(' | ').map(a => a.match(/\d+/g).map(dig => rules[dig]().source).join('')).join('|') + ')')}
rules['4'] = function() {return new RegExp('a')}
rules['5'] = function() {return new RegExp('b')}


0: 8 11 == 
8: 42 | 42 8
11: 42 31 | 42 11 31
*/