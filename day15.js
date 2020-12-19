const samples = [[1, 3, 2], [2, 1, 3], [1, 2, 3], [2, 3, 1], [3, 2, 1], [3, 1, 2], [13, 0, 10, 12, 1, 5, 8]];
//[1, 10 ,27, 78, 438, 1836]

function elvesMemoryGame(array){
    let record = {}, memory = {}, current, prev;

    for(let turn = 1; turn <= 2020; turn++){
        if(!memory.hasOwnProperty(current)){
            current = array[turn - 1] || 0;
        }
        else{
            current = record[current].slice(0,2).reduce((a, b) => a - b);
        }

        memory = {...record};
        record[current] = [turn].concat(record[current] || []);
    }

    return current;
}

//for(let i of samples){
//    console.log(elvesMemoryGame(i));
//}
console.log(elvesMemoryGame([13, 0, 10, 12, 1, 5, 8]));
