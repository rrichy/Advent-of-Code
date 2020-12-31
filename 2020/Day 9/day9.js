function findXMASWeakness(preamble){
	const text = $('pre').innerText.trim().split('\n').map(Number);
	let weakness, //[val, index]
		encWeakness;

	function sumExist(arr, sum){
		let set = new Set();

		for(let i of arr){
			if(set.has(sum - i)){
				return true;
			}

			set.add(i)
		}
		return false;
	}

	for(let i = 0; i < text.length; i++){
		if(!sumExist(text.slice(i, i + preamble), text[i + preamble])){
			weakness = [text[i + preamble], i + preamble];
			break;
		}
	}

	for(let i = 0; i < weakness[1]; i++){
		let size = 1, sum = text[i];

		while(sum < weakness[0]){
			size++;
			sum = text.slice(i, i + size).reduce((a, b) => a + b, 0);
		}

		if(sum == weakness[0]){
			encWeakness = Math.min(...text.slice(i, i + size)) + Math.max(...text.slice(i, i + size));
			break;
		}
	}

	return [weakness[0], encWeakness];
}

const weak = findXMASWeakness(25);

console.log('XMAS Weakpoint:', weak[0]);
console.log('XMAS Encryption weakness:', weak[1]);