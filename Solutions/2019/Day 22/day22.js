const fs = require('fs');

const INPUT = fs.readFileSync('input.txt').toString().trim();
const SAMPLES = fs.readFileSync('sample.txt').toString().trim().split(/\r?\n\r?\n/);

function shuffleCards(shuffleList, deckSize = 10) {
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
                // deck = [...temp];
                return temp;
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
                let temp = [], top = topcard;
                // console.log(deck);
                deck = shuffle['deal into new stack']();
                console.log(deck);
                deck.forEach((next, card) => {
                    let current = next;
                    for(let i = 0; i < num + 1; i++) {
                        current = deck[current];
                    }
                    temp[card] = current;
                    // console.log(current);
                });
                // console.log(temp);
                // deck = [...temp];
                topcard = top;
                bottomcard = deck.findIndex(a => a == topcard);
                return temp;
            }
        };
    

    // for(let instruction of shuffleList.split(/\r?\n/)) {
    //     let [, key,, val] = instruction.match(/(deal with increment|cut|deal into new stack)((?: )(-?\d+))?/);
    //     val = Number(val);
    //     shuffle[key](val);
    //     console.log(key, val);
    // }
    // console.log(deck);
    // shuffle['deal into new stack']();
    // shuffle['cut'](3);
    // shuffle['cut'](-4);
    deck = shuffle['deal with increment'](7);
    console.log(deck, buildDeck().join(''));
    // deck = shuffle['deal with increment'](9);
    // console.log(deck, buildDeck().join(''));
    //map cards

    // console.log(topcard, bottomcard, );
    return deck;
}

console.log(shuffleCards(SAMPLES[2]));