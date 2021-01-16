const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim().split(/\r?\n\r?\n/);
const sample1 = fs.readFileSync('sample1.txt').toString().trim().split(/\r?\n\r?\n/);
const sample2 = fs.readFileSync('sample2.txt').toString().trim().split(/\r?\n\r?\n/);
const sample3 = fs.readFileSync('sample3.txt').toString().trim().split(/\r?\n\r?\n/);

function buildRules(page){
    let rules = {};
    for(let rule of page[0].split(/\r?\n/)){
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

    return rules;
}

function noAmendment(page, rule){
    return page[1].split(/\r?\n/).filter(a => rule[0]().test(a)).length;
}

function withAmendment(page){
    /*
    say 42: a and 31: b
    8: 42 | 42 8;            matches a+ ; a, aa, aaa, aaaa, aaaaa
    11: 42 31 | 42 11 41     matches ab if a & b has same length ; ab, aabb, aaabbb, aaaabbbb  
    */
    rules[8] = function() {return new RegExp('(' + rules[42]().source + ')+')}; 

    let regExp = ['(' + rules[42]().source + '){1}(' + rules[31]().source + '){1}', // since regex cannot get the length of any of two groups, i resorted into a finite length match
        '(' + rules[42]().source + '){2}(' + rules[31]().source + '){2}',
        '(' + rules[42]().source + '){3}(' + rules[31]().source + '){3}',
        '(' + rules[42]().source + '){4}(' + rules[31]().source + '){4}',
        '(' + rules[42]().source + '){5}(' + rules[31]().source + '){5}',
        '(' + rules[42]().source + '){6}(' + rules[31]().source + '){6}']


    rules[11] = function () {return new RegExp(new RegExp('((' + regExp.join(')|(') +'))'))};

    return page[1].split(/\r?\n/).filter(a => rules[0]().test(a)).length;
}

let target = input,
    rules = buildRules(target);

console.log('Part 1:', noAmendment(target, rules));
console.log('Part 2:', withAmendment(target, rules));