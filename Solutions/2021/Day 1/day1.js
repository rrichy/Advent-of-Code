const puzzleInput = require("fs")
  .readFileSync("puzzle.txt")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map(Number);

function getIncreasedCount(input) {
  return input.reduce(
    (acc, b, i) => (i !== 0 && b > input[i - 1] ? ++acc : acc),
    0
  );
}

function getCountWithWindow(input, window = 3) {
  const lastIndex = input.length - window;
  return input.reduce((acc, b, i) => {
    if (i !== 0 && i <= lastIndex) {
      const currentSum = input.slice(i, i + 3).reduce((a, c) => a + c);
      const prevSum = input.slice(i - 1, i + 2).reduce((a, c) => a + c);
      if (currentSum > prevSum) return ++acc;
    }
    return acc;
  }, 0);
}

console.log("Part 1:", getIncreasedCount(puzzleInput));
console.log("Part 2:", getCountWithWindow(puzzleInput));
