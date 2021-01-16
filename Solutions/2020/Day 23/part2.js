function crabCups(initial, moves = 10000000, cupCount = 1000000){
    initial = initial.split('').map(Number);
    
    let nextPointer = Array(cupCount + 1).fill().map((_, i) => i + 1);
    
    nextPointer[0] = nextPointer[nextPointer.length - 1] = initial[0];
    for(let i = 0; i < initial.length; i++){ nextPointer[initial[i]] = initial[i + 1] || Math.max(...initial) + 1; }

    let current = 0;

    for(let i = 0; i < moves; i++){
        current = nextPointer[current];
        let destination = current !== 1 ? current - 1 : cupCount, //2
            c1 = nextPointer[current], //8
            c2 = nextPointer[c1], //9
            c3 = nextPointer[c2]; //1
        
        while([c1, c2, c3].includes(destination)){
            destination--;
            if(destination === 0) destination = cupCount;
        }
        
        [nextPointer[c3], nextPointer[destination], nextPointer[current]]
            = [nextPointer[destination], nextPointer[current], nextPointer[c3]];
    }

    return nextPointer[1] * nextPointer[nextPointer[1]];
}

module.exports = {
    crabCups
};