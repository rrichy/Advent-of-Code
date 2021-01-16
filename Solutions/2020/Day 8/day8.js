function getInitialAcc(){
	const commands = $('pre').innerText.trim().split('\n');

	let accumulator = 0,
		pastCommands = new Set(),
		counter = 0;

	while (!pastCommands.has(counter)){
		pastCommands.add(counter);

		let instruction = commands[counter].match(/(acc|jmp|nop) ([+-]\d+)/);
		
		switch (instruction[1]){
			case 'acc':
				accumulator += parseInt(instruction[2]);
				counter++;
				break;
			case 'jmp':
				counter += parseInt(instruction[2]);
				break;
			case 'nop':
				counter++;
				break;
		}
	}

	return accumulator;
}

function getRepairedAcc(){
	const commands = $('pre').innerText.trim().split('\n');
	
	let accumulator = 0,
		pastCommands = [],
		lastJumpStat, counter = 0;
		
	while (counter < commands.length){
		let instruction = commands[counter].match(/(acc|jmp|nop) ([+-]\d+)/);
		
		if (!pastCommands.includes(counter))
			pastCommands.push(counter);
		else{
			[counter, accumulator, pastCommands, lastJumpStat] = lastJumpStat;
			instruction[1] = 'nop';
		}
		
		switch (instruction[1]){
			case 'acc':
				accumulator += parseInt(instruction[2]);
				counter++;
				break;
			case 'jmp':
				lastJumpStat = [counter, accumulator, pastCommands, lastJumpStat];
				counter += parseInt(instruction[2]);
				break;
			case 'nop':
				counter++;
				break;
		}
	}
	
	return accumulator;
}

console.log('Part 1:', getInitialAcc());
console.log('Part 2:', getRepairedAcc());