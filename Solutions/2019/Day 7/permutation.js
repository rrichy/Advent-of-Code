function getArrPermutations(array){
	if(array.length == 1) return array;
	let result = [];
	for(let i = 0; i < array.length; i++){
		let subArr = array.concat();
		let head = subArr.splice(i,1);
		getArrPermutations(subArr).forEach(x=>{
			result.push(head.concat(x));
		});
	}
	return result;
}

function getCombination(array, size){
	if(size == 1) return array;
	let result = [];
	let subArr = array.concat();
	for(let i = 0; i < array.length; i++){
		let head = subArr.shift()

		getCombination(subArr, size - 1).forEach(x=>{
			result.push([head].concat(x));
		});
	}
	return result;
}

function getStrPermutations(str) {
  if (str.length == 1) return [str];
  let result = [];
  for (let i = 0; i < str.length; i++) {
    let head = str[i];
	let subString = str.slice(0,i) + str.slice(i+1);
    getStrPermutations(subString).forEach(x=>{
      result.push(head + x);
    });
  }
  return result;
}

module.exports = {
	getArrPermutations, getCombination, getStrPermutations
}