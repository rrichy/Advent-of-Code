function findJoltage1_3(){
    const text = $('pre').innerText.trim().split('\n').map(Number), builtInJoltage = Math.max(...text) + 3;
    let differences = {}, prev = 0, removable = [], lastStored = 0;

    for(let i of [...text.sort((a, b) => a - b), builtInJoltage]){
        differences[i - prev] = (differences[i - prev] || 0) + 1;
        prev = i;

        if(i - lastStored < 3){
            removable.push(i);
        }
        else{
            if(i - lastStored > 3){
                removable.pop()
            }

            lastStored = i;
        }        
    }

    return [differences, removable];
}

/*
lengthremoved + lrC0 + lrC1 + lrC2 + ... + lrCn
1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19   whole
1, 4, 5, 6, 7, 10, 12, 15, 16, 19   11-removed
1, 4, 5, 7, 10, 11, 12, 15, 16, 19  6-removed
1, 4, 5, 7, 10, 12, 15, 16, 19      6-11-removed
1, 4, 6, 7, 10, 11, 12, 15, 16, 19  5-removed
1, 4, 6, 7, 10, 12, 15, 16, 19      5-11-removed
1, 4, 7, 10, 11, 12, 15, 16, 19     5-6-removed
1, 4, 7, 10, 12, 15, 16, 19         5-6-11-removed
*/