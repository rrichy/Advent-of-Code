function sumMemory(){
    const bitmask = $('pre').innerText.trim().split('\n');
    let mask, memory = {};

    for(let line of bitmask){
        let [, name, value] = line.match(/(.*?) = (.*)/);

        if(name == 'mask'){
            mask = value;
        }
        else{
            let bitValue = parseInt(value).toString(2), temp = '';

            if(address.length < 36){
                bitValue = '0'.repeat(36 - bitValue.length) + bitValue;
            }

            for(let bit = 0; bit < 36; bit++){
                if(mask[bit] == 'X'){
                    temp += bitValue[bit];
                }
                else{
                    temp += mask[bit];
                }
            }

            memory[name.match(/\d+/g)] = parseInt(temp, 2);
        }
    }

    return Object.values(memory).reduce((a, b) => a + b);
}

function maskDecoder(){
    const bitmask = $('pre').innerText.trim().split('\n'); //document.getElementsByTagName('pre')[4]
    let mask, memory = {};

    for(let line of bitmask){
        let [, name, value] = line.match(/(.*?) = (.*)/);

        if(name == 'mask'){
            mask = value;
        }
        else{
            let address = parseInt(name.match(/\d+/g)).toString(2), floatingAdd = '';

            if(address.length < 36){
                address = '0'.repeat(36 - address.length) + address;
            }

            for(let bit = 0; bit < 36; bit++){
                if(mask[bit] == '1' || mask[bit] == 'X'){
                    floatingAdd += mask[bit];
                }
                else{
                    floatingAdd += address[bit];
                }
            }

            let floatLength = floatingAdd.match(/X/g).length;
            address = [];
            for(let i = 0; i < 2**floatLength; i++){
                let replace = i.toString(2), temp = '';

                if(replace.length < floatLength){
                    replace = '0'.repeat(floatLength - replace.length) + replace;
                }

                replace = replace.split('');

                for(let bit = 0; bit < 36; bit++){
                    if(floatingAdd[bit] == 'X'){
                        temp += replace.shift();
                    }
                    else{
                        temp += floatingAdd[bit];
                    }
                }

                memory[parseInt(temp, 2)] = parseInt(value);
            }
        }
    }

    return Object.values(memory).reduce((a, b) => a + b);
}

console.log('Part 1:', sumMemory());
console.log('Part 2:', maskDecoder());