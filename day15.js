const samples = [[0, 3, 6], [1, 3, 2], [2, 1, 3], [1, 2, 3], [2, 3, 1], [3, 2, 1], [3, 1, 2], [13, 0, 10, 12, 1, 5, 8]];
//[1, 10 ,27, 78, 438, 1836]
//[175594, 2578, 3544142, 261214, 6895259, 18, 362]

function elvesMemoryGame(initials, limit){
    let memory = new Map(initials.map((num, index) => [num, index + 1]));
    let temp = NaN, num = initials[initials.length - 1];
    //num is always the previous input
    for(let turn = initials.length; turn < limit; turn++){
        num = memory.has(num) ? turn - memory.get(num) : 0;
        memory.set(temp, turn);
        temp = num;
    }
    return num;
}


//for(let i of samples){
//   console.log(elvesMemoryGame(i, 30000000));
//}
console.log(elvesMemoryGame(samples[7], 30000000));
