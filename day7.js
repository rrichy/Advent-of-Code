class Collection{
	constructor(){
		this.bags = [];
	}
	
	add(bag){
		if(!this.has(bag)) this.bags.push(bag);
		return;
	}
	
	has(bag){
		return this.bags.includes(bag);
	}
}

class Bag{
	constructor(name){
		this.name = name;
		this.content = {};
	}
}

function contentCollection(strngArray){
	let collect = new Collection();
	
	for(let info of strngArray){
		let current = new Bag(info.match(/(.*) bags? contains?/)[1]);
		
		try{
			for(let content of info.match(/\d+.*?bags?/g)){
				let [, qty, bag] = content.match(/(\d+) (.*?) bags?/);
				current.content[bag] = parseInt(qty);
			}
		}
		catch{}
		
		collect.add(current);
	}
	
	return collect;
}

function findBagHasColors(bagName){
	let total = new Set();
	
	let holders = thisCollection.bags.filter(a => Object.keys(a.content).includes(bagName)).map(a => a.name);
	
	for(let bag of holders){
		total.add(bag);
		total = new Set([...total, ...findBagHasColors(bag)])
	}
	
	return total;
}

let txtArray = $('pre').innerText.split('\n').filter(a => a.length),
	thisCollection = contentCollection(txtArray);
	
console.log(findBagHasColors('shiny gold').size);

function findNumBagOf(bagName){
	let current = thisCollection.bags.find(a => a.name == bagName),
		total = 0;
	
	for(let bag in current.content){
		total += current.content[bag] + current.content[bag] * findNumBagOf(bag);
	}
	
	return total;
}

console.log(findNumBagOf('shiny gold'))