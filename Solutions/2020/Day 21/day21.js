const input = require('fs').readFileSync('day21-input.txt').toString().trim();
let allergenList = {};

function findAllergens(){
    let lookupList = {};
    for(let food of input.split(/\r?\n/)){
        let [ingredients, allergens] = food.split(' (contains ');
        ingredients = ingredients.split(' ');
        allergens = allergens.replace(')', '').split(', ');

        allergens.forEach(allergen => {
            if(allergenList.hasOwnProperty(allergen)) return;

            let temp = lookupList[allergen] || [];
            if(temp.some(a => ingredients.includes(a))) temp = temp.filter(a => ingredients.includes(a));
            else temp = temp.concat(ingredients);
            lookupList[allergen] = temp;

            allergenWrite();
        });
    }

    function allergenWrite(){
        let allergen;
        for(let [k, v] of Object.entries(lookupList))
            if(v.length === 1) allergen = k;
        
        if(allergen){
            allergenList[allergen] = lookupList[allergen].shift();
            delete lookupList[allergen];
            for(let [k, v] of Object.entries(lookupList))
                lookupList[k] = v.filter(a => a != allergenList[allergen]);
            
            allergenWrite();
        }
        else return;
    }
}

findAllergens();

function numAppearance(){
    let data = input.replace(/ \(contains.*?\)/g, '');
    return data.match(/\w+/g).filter(a => !Object.values(allergenList).includes(a)).length;
}

function orderedAllergen(){
    return Object.keys(allergenList).sort().map(a => allergenList[a]).join(',');
}

console.log('Part 1:', numAppearance());
console.log('Part 2:', orderedAllergen());