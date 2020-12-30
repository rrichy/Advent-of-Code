let txt = $('pre').innerText.split('\n\n');
console.log('Sum of counts:', txt.reduce((a,b) => a + numQuestions(b), 0));
console.log('Sum of counts w/ correction:', txt.reduce((a,b) => a + numCorrection(b), 0));

function numQuestions(strng){
	let questions = new Set();
	strng = strng.replace(/\n/g, '');
	
	for(let i = 0; i < strng.length; i++)
		questions.add(strng[i]);
	
	return questions.size;
}

function numCorrection(strng){
	strng = strng.trim().split('\n');
	let collection = [];
	
	collection.push(...strng[0].split(''));
	
	while(strng.length){
		collection = strng.shift().split('').filter(a => collection.includes(a));
	}
	
	return collection.length;
}