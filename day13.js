function earliestBusProduct(){
    const [earliestPossible, buses] = $('pre').innerText.trim().split('\n');
    let availableBuses = buses.match(/\d+/g).map(Number), timestamp = {};

    availableBuses.forEach(bus => timestamp[bus * Math.ceil(earliestPossible / bus)] = bus);
    
    let earliest = Math.min(...Object.keys(timestamp));
    return timestamp[earliest] * (earliest - earliestPossible);
}

function findTimeContest(){
    const buses = $('pre').innerText.trim().split('\n').pop().split(',').map(Number);
    let remainders = {};

    buses.forEach((bus, i) => {
        if(!isNaN(bus)){
            if(i == 0){
                remainders[bus] = 0;
            }
            else{
                remainders[bus] = bus - i;
                if(remainders[bus] < 0){
                    let i = -1;
                    while(true){
                        if(remainders[bus] - (bus * i) < 0){
                            i--;
                        }
                        else{
                            remainders[bus] = remainders[bus] - (bus * i);
                            break;
                        }
                            
                    }
                    
                }
            }
        }
    });

    let bigN = Object.keys(remainders).reduce((a, b) => a * b, 1);
    let smallNs = {}, subXs = {}, sum = 0;

    for(let bus in remainders){
        smallNs[bus] = bigN / bus;
        let mod = (bigN / bus) % bus, i = 1;

        while(true){
            if(mod * i % bus == 1){
                subXs[bus] = i;
                break;
            }
            i++;
        }
    }

    for(let bus in remainders){
        sum += remainders[bus] * smallNs[bus] * subXs[bus];
    }
    
    return sum % bigN; //dunno why +1 on large number 
}

console.log('Part 1:', earliestBusProduct());
console.log('Part 2:', findTimeContest());