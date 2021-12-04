const puzzleInput = require("fs")
  .readFileSync("puzzle.txt")
  .toString()
  .trim()
  .split(/\r?\n/);

function getAnswer1(input) {
  let vertical = 0,
    horizontal = 0;
  for (let command of input) {
    const [dir, val] = command.split(" ");
    if (dir === "forward") horizontal += +val;
    else if (dir === "down") vertical += +val;
    else vertical -= +val;
  }

  return vertical * horizontal;
}

function getAnswer2(input) {
  let vertical = 0,
    horizontal = 0,
    aim = 0;
  for (let command of input) {
    const [dir, val] = command.split(" ");
    if (dir === "forward") {
      horizontal += +val;
      vertical += +val * aim;
    } else if (dir === "down") aim += +val;
    else aim -= +val;
  }

  return vertical * horizontal;
}

console.log("Part 1:", getAnswer1(puzzleInput));
console.log("Part 2:", getAnswer2(puzzleInput));
