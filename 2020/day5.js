txt = $('pre').outerText.split('\n').filter(a=>a.length);
list = txt.map(idDecoder).sort((a,b)=> a-b);
console.log('Highest seat ID on a boarding pass:', list[list.length - 1]);
console.log('Seat Id:', list.filter((a,i)=>a-1 != list[i-1])[1] - 1);

function idDecoder(strng){
    let [range, col] = [[0, 127], [0, 7]];//inclusive range
    
	strng = strng.split('')
    while(strng.length){
        let half = Math.floor((range[1] - range[0])/2),
            chalf = Math.floor((col[1] - col[0])/2);
		let [high, low] = [[range[0] + half + 1, range[1]], [range[0], range[0] + half]],
			[chigh, clow] = [[col[0] + chalf + 1, col[1]], [col[0], col[0] + chalf]];
        if(strng[0] == 'F'){
			if(range[1] - range[0] != 1) range = low;
			else range = range[0];
		}
    
        else if(strng[0] == 'B'){
            if(range[1] - range[0] != 1) range = high;
			else range = range[1];
		}
		
        else if(strng[0] == 'L'){
            if(col[1] - col[0] != 1) col = clow;
			else col = col[0];
		}
        else{
			if(col[1] - col[0] != 1) col = chigh;
			else col = col[1];
		}
        strng.shift()
    }
    return 	range * 8 + col;
}