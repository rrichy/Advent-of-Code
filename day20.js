const tilesList = require('fs').readFileSync('day20-sample.txt').toString().trim();
let tiles = [];

getTileEdges();

function getTileEdges(){
    for(let tile of tilesList.split('\r\n\r\n')){
        let [, key, image] = tile.match(/^.*?(\d+):([\r\n.#]*)/);

        let temp = new Tile(key, image);
        
        tiles.push(temp);
    }
}

function getCorners(){
    let corners = [];//image corner tiles has 2 edges with no match,

    for(let i = 0; i < tiles.length; i++){
        let subtiles = tiles.slice(0, i).concat(tiles.slice(i + 1)), numMatch = 0;

        tiles[i].edges.slice(0,4).forEach(edge => {
            for(let subtile of subtiles){
                if(subtile.includes(edge)){
                    numMatch++;
                    break;
                }
            }
        });

        if(numMatch == 2) corners.push(parseInt(tiles[i].tile));
    }

    return corners.reduce((a, b) => a * b);
}

class Tile{
    constructor(tileNum, tileStrng){
        this.tile = tileNum;
        this.edges = [];
        this.border = [];

        let temp = tileStrng.split('\r\n').map(a => a.split(''));
        
        this.edges.push(...[temp[0].join(''), temp[temp.length - 1].join(''), temp.reduce((a, b) => a.concat(b[0]), []).join(''),
            temp.reduce((a, b) => a.concat(b[temp.length - 1]), []).join(''), [...temp[0]].reverse().join(''),
            [...temp[temp.length - 1]].reverse().join(''), temp.reduce((a, b) => a.concat(b[0]), []).reverse().join(''),
            temp.reduce((a, b) => a.concat(b[temp.length - 1]), []).reverse().join('')]);
        //u, d, l, r, fu, fd, fl, fr
    }
}

//let sub = new Map(tilesEdges);
//sub.delete('2311');

//console.log(sub);

console.log('Part 1:', getCorners());