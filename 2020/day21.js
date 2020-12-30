class Ingredient{
    constructor(name){
        this.name = name;
        this.possible = [];
        this.allergen = 'None';
    }
}


let input = require('fs').readFileSync('day21-input.txt').toString().trim();
let ingredientList = [], allergenList = [];

findAllergens();

function findAllergens(){
    for(let food of input.split(/\r?\n/)){
        let [ingredients, allergens] = food.split(' (contains ');
        ingredients = ingredients.split(' ');
        allergens = allergens.replace(')', '').split(', ');

        ingredients.forEach(ingredient => {
            let temp = ingredientList.find(a => a.name === ingredient);
            if(!temp){
                temp = new Ingredient(ingredient);
                temp.possible.push(...allergens);
                ingredientList.push(temp);
            }
            else if(temp && temp.possible.some(allergen => allergens.includes(allergen))){
                temp.possible = temp.possible.filter(allergen => allergens.includes(allergen));
                if(temp.possible.length === 1){
                    let last = temp.possible.pop();
                    if(!allergenList.includes(last)){
                        temp.allergen = last;
                        allergenList.push(last);
                    }
                }
            }
            else{
                if(temp.allergen === 'None') temp.possible.push(...allergens);
            }
        });
    }// nuts|shellfish|peanuts|soy|fish|dairy|wheat|eggs

    ingredientList.forEach(ingredient => {
        ingredient.possible = ingredient.possible.filter(allergen => !allergenList.includes(allergen));
        if(ingredient.possible.length === 1){
            let last = ingredient.possible.pop();
            if(!allergenList.includes(last)){
                ingredient.allergen = last;
                allergenList.push(last);
                ingredientList.forEach(ingredient => ingredient.possible = ingredient.possible.filter(b => b !== ingredient.allergen));
            }
        }
    });

    console.log(allergenList);

    // ingredientList.forEach(a => {
    //     console.log(a.name, ':', a.allergen, 'possible:', a.possible);
    // })
}

function numAppearance(){
    let total = 0;
    let list = ingredientList.filter(ingredient => ingredient.allergen === 'None').map(ingredient => ingredient.name).sort((a, b) => b.length - a.length);
    console.log(list);
    // console.log(list.join('|'));
    list.forEach(ingredient => {
        let match = input.match(new RegExp(ingredient, 'g'))
        total += match.length;
        input.replace(ingredient, '');
    });

    // return input.match(new RegExp(list.join('|'), 'g')).length
    return total;
}

console.log(numAppearance());

// 1385 very low
// 2019/2016 too high