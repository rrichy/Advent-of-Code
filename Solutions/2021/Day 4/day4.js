const bingoBoards = require("fs")
  .readFileSync("puzzle.txt")
  .toString()
  .trim()
  .split(/\r?\n\r?\n/);

const picks = bingoBoards.shift();

class Board {
  constructor(str) {
    let temp = str.split(/\r?\n/).map((a) => a.match(/\d+/g).map(Number));

    this.total = temp.reduce(
      (acc1, a) => acc1 + a.reduce((acc2, b) => acc2 + b, 0),
      0
    );
    this.rows = temp.map((a) => new Set(a));
    this.cols = temp.map((a, i) => new Set(a.map((b, j) => temp[j][i])));
  }

  check(n) {
    if (
      this.rows.some((a) => a.size === 0) ||
      this.cols.some((a) => a.size === 0)
    ) {
      return this.total * n;
    }
    return false;
  }

  remove(n) {
    if (
      this.rows.some((a) => a.delete(n)) &&
      this.cols.some((a) => a.delete(n))
    )
      this.total -= n;
    return this.check(n);
  }

  get row() {
    return this.rows;
  }
  get col() {
    return this.cols;
  }
}

function playBingo(boardsStr, draws) {
  const boards = boardsStr.map((a) => new Board(a));
  let winningAns = -1;
  for (let draw of draws.split(",")) {
    boards.forEach((a) => {
      if (winningAns < 0) {
        let temp = a.remove(+draw);
        if (temp) winningAns = temp;
      }
    });
    if (winningAns >= 0) return winningAns;
  }
}

function playTillEnd(boardsStr, draws) {
  const boards = boardsStr.map((a) => new Board(a));
  let winningAns = -1;
  for (let draw of draws.split(",")) {
    boards.forEach((a, i) => {
      if (a) {
        let temp = a.remove(+draw);
        if (temp) {
          winningAns = temp;
          boards[i] = false;
        }
      }
    });
  }
  return winningAns;
}

console.log("Part 1:", playBingo(bingoBoards, picks));
console.log("Part 2:", playTillEnd(bingoBoards, picks));
