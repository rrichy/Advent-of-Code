const fs = require('fs');

const INPUT = fs.readFileSync('input.txt').toString().trim();
const SAMPLES = fs.readFileSync('sample.txt').toString().trim().split(/\r?\n\r?\n/);

function shuffleCards(shuffleList, deckSize = 10, repeat = 1) {
    let deck = Array(deckSize).fill().map((_, next) => next + 1), // index/position in deck refers to the card itself, its value is the next card
        topcard = 0, bottomcard = deckSize - 1;
    deck[deckSize - 1] = 0;

    const buildDeck = () => {
        let mapping = [topcard], last = topcard;
        for(let i = 1; i < deckSize; i++){
            mapping.push(deck[last]);
            last = deck[last];
        }
        return mapping;
    }

    const shuffle = {
            'deal into new stack': () => {
                let temp = [];
                [topcard, bottomcard] = [bottomcard, topcard];
                deck.forEach((next, card) => {
                    temp[next] = card;
                })
                deck = [...temp];
            },
            'cut': (num) => {
                let current = topcard, prev;
                if(num > 0) {
                    for(let i = 0; i < num; i++) {
                        prev = current;
                        current = deck[current];
                    }
                }
                else {
                    for(let i = 0; i < deckSize + num; i++) {
                        prev = current;
                        current = deck[current];
                    }
                }
                topcard = current;
                bottomcard = prev;
            },
            'deal with increment': (num) => {
                let temp = [], tempDeck = buildDeck();
                for(let i = 0;; i += num) {
                    if(i >= deckSize) i = i - deckSize;
                    temp[i] = tempDeck.shift();
                    if(!tempDeck.length) break;
                }
                temp.forEach((card, pos) => deck[card] = temp[pos + 1]);
                deck[temp[deckSize - 1]] = temp[0];
                bottomcard = temp[deckSize - 1];
            }
        };
    
    for(let i = 0; i < repeat; i++){
        for(let instruction of shuffleList.split(/\r?\n/)) {
            let [, key,, val] = instruction.match(/(deal with increment|cut|deal into new stack)((?: )(-?\d+))?/);
            val = Number(val);
            shuffle[key](val);
        }    
    }

    return [deck, topcard, bottomcard];
}

function get2019position(shuffleList, deckSize = 10) {
    let [deck, topcard] = shuffleCards(shuffleList, deckSize), current = topcard, pos = 0;
    while(current != 2019) {
        current = deck[current];
        pos++;
    }
    return pos;
}

function cardAt2020position(shuffleList) {
    let [deck, topcard] = shuffleCards(shuffleList, 119315717514047, 101741582076661), current = topcard, pos = 0;
    while(pos != 2020) {
        current = deck[current];
        pos++;
    }
    return current;
}

// console.log(shuffleCards(SAMPLES[3]))
console.log('Part 1:', get2019position(INPUT, 10007));
console.log('Part 2:', cardAt2020position(INPUT))