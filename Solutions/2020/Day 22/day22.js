const deck = require('fs').readFileSync('input.txt').toString().trim().split(/\r?\n\r?\n/).map(a => a.replace(/^.*:\r?\n/, '').split(/\r?\n/).map(Number));

function crabCombat(){
    let [p1, p2] = JSON.parse(JSON.stringify(deck));

    function combat(){
        if(p1.length === 0) return [2, p2];
        if(p2.length === 0) return [1, p1];
    
        let [draw1, draw2] = [p1.shift(), p2.shift()];
        if(draw1 > draw2) p1.push(draw1, draw2);
        else p2.push(draw2, draw1);
    
        return combat([p1, p2]);
    }

    let result = combat();
    return `Player ${result[0]} Wins with a score of ${result[1].reduce((a, b, i) => a + b * (result[1].length - i), 0)}`;
}

function recursiveCombat(){
    let initial = JSON.parse(JSON.stringify(deck)),
        [hist1, hist2] = [new Set(), new Set()],
        result = combat(initial, hist1, hist2);

    function combat([deck1, deck2], record1, record2){
        if(record1.has(JSON.stringify(deck1)) || record2.has(JSON.stringify(deck2))) return [1, deck1];
        if(deck1.length === 0) return [2, deck2];
        if(deck2.length === 0) return [1, deck1];

        record1.add(JSON.stringify(deck1));
        record2.add(JSON.stringify(deck2));
    
        let [draw1, draw2] = [deck1.shift(), deck2.shift()], result;
        if(deck1.length >= draw1 && deck2.length >= draw2){
            let [dsub1, dsub2] = [deck1.slice(0, draw1), deck2.slice(0, draw2)],
            [hsub1, hsub2] = [new Set(), new Set()];
            result = combat([dsub1, dsub2], hsub1, hsub2);
        }
        else{
            result = draw1 - draw2 > 0 ? [1, deck1] : [2, deck2];
        }

        if(result[0] == 1) deck1.push(draw1, draw2);
        else deck2.push(draw2, draw1);
    
        return combat([deck1, deck2], record1, record2);
    }

    return `Player ${result[0]} Wins with a score of ${result[1].reduce((a, b, i) => a + b * (result[1].length - i), 0)}`;
}

console.log('Part 1:', crabCombat());
console.log('Part 2:', recursiveCombat());
