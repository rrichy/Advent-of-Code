const input = require('fs').readFileSync('input.txt').toString().trim().split(/\r?\n/);
const sample1 = require('fs').readFileSync('sample1.txt').toString().trim().split(/\r?\n/);
const sample2 = require('fs').readFileSync('sample2.txt').toString().trim().split(/\r?\n/);

// class Body{
//     constructor(name, point){
//         this.name = name;
//         this.point = name === 'COM' ? null : point;
//         this.orbit = [];
//     }
// }

// class LocalMap{
//     constructor(){
//         this.body = [];
//     }

//     add(orbitRelation){
//         let [point, object] = orbitRelation.split(')'),
//             center = this.body.find(object => object.name === point) || new Body(point);
        

//         this.body.push();
//         return this;
//     }
// }

// let map = new LocalMap();

function generateMap(map){ //key:CoM value: orbits
    let localMap = new Map(), count = {'COM': 0};

    for(let orbit of map){
        let [center, object] = orbit.split(')');

        localMap.set(center, localMap.get(center) ? [...localMap.get(center), object] : [object]);
    }

    const traverse = (center = 'COM') => {
        let orbits = localMap.get(center);
        
        if(orbits){
            orbits.forEach(a => {
                count[a] = 1 + count[center];
                traverse(a);
            });
        }
        return;
    }

    traverse();

    return [localMap, count];
}

function minTransferToSan(map){
    let [localMap,] = generateMap(map), valToKey = {};
    
    for(let [val, keys] of [...localMap]){
        for(let key of keys){
            valToKey[key] = val;
        }
    }

    let traverseToCoM = (origin) => {
        let traversal = [], current = origin;
        while(current != 'COM'){
            current = valToKey[current];
            traversal.push(current);
        }
        return traversal;
    }

    //minimun transfer is calculated by adding both CoM-origin and CoM-goal. Then subtracting CoM-intersection traversal
    let san = traverseToCoM('SAN'), you = traverseToCoM('YOU');
    return you.filter(a => !san.includes(a)).concat(san.filter(a => !you.includes(a))).length;
}

console.log('Part 1:', Object.values(generateMap(input)[1]).reduce((a, b) => a + b));
console.log('Part 2:', minTransferToSan(input));