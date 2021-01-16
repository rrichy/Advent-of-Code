const input = [2084668, 3704642];   // public keys [card, door]
const sample = [5764801, 17807724];

function getEncryptionKey(publicKeys){
    let [cardLoop, doorLoop] = publicKeys.map(getLoopSize);

    return getPublicKey(cardLoop, publicKeys[1]);
}

function getPublicKey(loop, subject = 7){
    let key = 1;
    for(let i = 1; i <= loop; i++){
        key = (key * subject) % 20201227;
    }
    return key;
}

function getLoopSize(key){
    let loop = 1, current = key, temp;

    while(current != 7){
        for(let i = 0;; i++){
            temp = (20201227 * i + current) / 7;
            if(Number.isInteger(temp)) { current = temp; break; }
        }
        loop++;
    }

    return loop;
}

console.log('Part 1:', getEncryptionKey(input));