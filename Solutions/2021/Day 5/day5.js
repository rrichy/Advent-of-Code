const puzzleInput = require("fs")
  .readFileSync("puzzle.txt")
  .toString()
  .trim()
  .split(/\r?\n/).map(a => a.match(/\d+/g).map(Number));

const sampleInput = require("fs")
  .readFileSync("sample.txt")
  .toString()
  .trim()
  .split(/\r?\n/).map(a => a.match(/\d+/g).map(Number));
//[x1, y1, x2, y2]

function overlaps(input) {
	const hashMap = new Map();
	const max = [0, 0];
	input.forEach(([x1, y1, x2, y2]) => {
		if(x1 === x2) {
			if(x1 > max[0]) max[0] = x1;
			if(y1 > y2) [y1, y2] = [y2, y1];
			for(let y = y1; y <= y2; y++){
				hashMap.set(`${x1}, ${y}`, (hashMap.get(`${x1}, ${y}`) || 0) + 1);
			}
		}
		if(y1 === y2) {
			if(y1 > max[1]) max[1] = y1;
			if(x1 > x2) [x1, x2] = [x2, x1];
			for(let x = x1; x <= x2; x++){
				hashMap.set(`${x}, ${y1}`, (hashMap.get(`${x}, ${y1}`) || 0) + 1);
			}
		}
	});
// hashToGrid(hashMap, max);
	let total = 0;
	for(const i of hashMap.values()) {
		if(i > 1) total++;
	}

	return total;
}

function overlapsAll(input) {
	const hashMap = new Map();
	const max = [0, 0];
	input.forEach(([x1, y1, x2, y2]) => {
		if (x1 > x2 || (x1 === x2 && y1 > y2)) [x1, x2, y1, y2] = [x2, x1, y2, y1];

		if(x2 > max[0]) max[0] = x2;
		if(y2 > max[1]) max[1] = y2;

		if(y1 > y2) {
			if(y1 > max[1]) max[1] = y1;
			for(let i = y1, o = 0; i >= y2; i--, o++) {
				hashMap.set(`${x1 + o}, ${i}`, (hashMap.get(`${x1 + o}, ${i}`) || 0) + 1);
			}
		}
		else if(y1 === y2) {
			for(let x = x1; x <= x2; x++){
				hashMap.set(`${x}, ${y1}`, (hashMap.get(`${x}, ${y1}`) || 0) + 1);
			}
		}
		else if(x1 === x2) {
			for(let y = y1; y <= y2; y++){
				hashMap.set(`${x1}, ${y}`, (hashMap.get(`${x1}, ${y}`) || 0) + 1);
			}
		}
		else {
			for(let y = y1, o = 0; y <= y2; y++, o++) {
				hashMap.set(`${x1 + o}, ${y}`, (hashMap.get(`${x1 + o}, ${y}`) || 0) + 1);
			}
		}
	});
// hashToGrid(hashMap, max);
	let total = 0;
	for(const i of hashMap.values()) {
		if(i > 1) total++;
	}

	return total;
}

function hashToGrid(hash, size) {
	let map = Array(size[1]+1).fill("").map(() => Array(size[0]+1).fill("").map(() => "."));
	for(const [k, v] of hash.entries()) {
		console.log([k, v])
		const [x, y] = k.split(", ");
		map[+y][+x] = v;
	}
	console.log(map.map(a=>a.join("")).join("\n"));
}

console.log("Part 1: ", overlaps(puzzleInput));
console.log("Part 2: ", overlapsAll(puzzleInput));