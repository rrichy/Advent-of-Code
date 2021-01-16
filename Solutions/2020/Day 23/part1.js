function crabCups(initial, moves = 100){
    initial = initial.split('').map(Number);
    
    let nextPointer = Array(initial.length + 1).fill().map((_, i) => i + 1);
    for(let i = 0; i < initial.length - 1; i++){ nextPointer[initial[i]] = initial[i + 1]; }
    nextPointer[0] = nextPointer[initial[initial.length - 1]] = initial[0];

    let current = 0, max = Math.max(...nextPointer), order = '';

    for(let i = 0; i < moves; i++){
        current = nextPointer[current];
        let destination = current !== 1 ? current - 1 : max, //2
            c1 = nextPointer[current], //8
            c2 = nextPointer[c1], //9
            c3 = nextPointer[c2]; //1
        
        while([c1, c2, c3].includes(destination)){
            destination--;
            if(destination === 0) destination = max;
        }
        
        [nextPointer[c3], nextPointer[destination], nextPointer[current]]
            = [nextPointer[destination], nextPointer[current], nextPointer[c3]];
    }

    current = nextPointer[1];
    while(current !== 1){
        order += current;
        current = nextPointer[current];
    }

    return order;
}

module.exports = {
    crabCups
};