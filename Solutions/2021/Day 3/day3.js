const puzzleInput = require("fs")
  .readFileSync("puzzle.txt")
  .toString()
  .split(/\r?\n/);

const sampleInput = require("fs")
  .readFileSync("sample.txt")
  .toString()
  .split(/\r?\n/);

function getPowerConsumption(input) {
  const bitlength = input[0].length;
  const gammaBinary = input
    .reduce((acc, b) => {
      for (let i = 0; i < bitlength; i++) {
        if (b[i] == 1) acc[i]++;
        else acc[i]--;
      }
      return acc;
    }, "0".repeat(bitlength).split("").map(Number))
    .map((a) => (a > 0 ? 1 : 0))
    .join("");

  const gamma = parseInt(gammaBinary, 2);
  return gamma * (gamma ^ parseInt("1".repeat(bitlength), 2));
}

function getLifeSupport(input) {
  const bitlength = input[0].length;

  let oxygen = [...input];
  let co2 = [...input];
  for (let i = 0; i < bitlength; i++) {
    if (oxygen.length > 1) {
      const max =
        oxygen.reduce((acc, b) => (b[i] == 1 ? ++acc : --acc), 0) >= 0 ? 1 : 0;
      oxygen = oxygen.filter((a) => a[i] == max);
    }
    if (co2.length > 1) {
      const min =
        co2.reduce((acc, b) => (b[i] == 1 ? ++acc : --acc), 0) >= 0 ? 0 : 1;
      co2 = co2.filter((a) => a[i] == min);
    }
  }
  return parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
  // return { gammaBinary, epsilonBinary };
}

console.log("Part 1:", getPowerConsumption(puzzleInput));
console.log("Part 2:", getLifeSupport(puzzleInput));
