const input = require('fs').readFileSync('input.txt').toString().trim();

function getImageData(image, width = 25, height = 6){
    let collection = [], [leastZero, targetLayer] = [Number.MAX_SAFE_INTEGER, null];

    for(let i = 0; i < image.length; i += width * height){
        let data = image.slice(i, i + width * height);
            // layer = data.match(new RegExp('.{' + width + '}', 'g'));

        if(/0/.test(data) && data.match(/0/g).length < leastZero){
            leastZero = data.match(/0/g).length;
            targetLayer = collection.length;
        }

        collection.push(data);
    }

    return [collection, targetLayer];
}

function checkImage(image){
    let [layers, target] = getImageData(image);

    return layers[target].match(/1/g).length * layers[target].match(/2/g).length;
}

function getMessage(image, width = 25, height = 6){
    let [layers, ] = getImageData(image, width, height), finalPixels = '', index = 0;

    while(finalPixels.length < width * height){
        for(let i = 0;; i++){
            if(layers[i][index] != '2'){
                finalPixels += layers[i][index] == '1' ? '#' : ' ';
                break;
            }
        }

        index++;
    }

    return finalPixels.match(new RegExp('.{' + width + '}', 'g'));
}

console.log('Part 1:', checkImage(input));
console.log('Part 2:', getMessage(input));