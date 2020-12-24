const input = require('fs').readFileSync('day20-sample.txt').toString().trim();
let tiles = [], image;

class Tile{
    constructor(tileNum, tileStrng){
        this.tile = tileNum;
        this.edges = [];
        this.border = [];
        this.inplace = 0;

        let temp = tileStrng.split('\r\n').map(a => a.split(''));
        
        this.edges.push(...[temp[0].join(''), temp[temp.length - 1].join(''), temp.reduce((a, b) => a.concat(b[0]), []).join(''),
            temp.reduce((a, b) => a.concat(b[temp.length - 1]), []).join(''), [...temp[0]].reverse().join(''),
            [...temp[temp.length - 1]].reverse().join(''), temp.reduce((a, b) => a.concat(b[0]), []).reverse().join(''),
            temp.reduce((a, b) => a.concat(b[temp.length - 1]), []).reverse().join('')]);
        //u, d, l, r, fu, fd, fl, fr
    }
}

getTilesArrangement();

function getTilesArrangement(){
    for(let tile of input.split('\r\n\r\n')){
        let [, key, image] = tile.match(/^.*?(\d+):([\r\n.#]*)/), 
            temp = new Tile(key, image.trim());

        tiles.push(temp);
    }

    for(let i = 0; i < tiles.length; i++){
        let subtiles = tiles.slice(0, i).concat(tiles.slice(i + 1));

        tiles[i].edges.slice(0,4).forEach(edge => {
            for(let subtile of subtiles){
                if(subtile.edges.includes(edge)){
                    tiles[i].border.push(subtile.tile);
                    break;
                }
            }
        });
    }

    let grid = Math.sqrt(tiles.length);
    image = Array(grid).fill().map(_=>[]);

    for(let row = 0; row < grid; row++){
        for(let col = 0; col < grid; col++){
            let temp;

            if(col == 0 && row == 0){
                temp = tiles.find(a => a.border.length == 2);
            }
            else{
                let ref = [image[row][col - 1], row != 0 ? image[row - 1][col] : undefined];
                
                if(ref[0] && ref[1]){
                    temp = tiles.find(a => a.border.includes(ref[0].tile) && a.border.includes(ref[1].tile) && a.inplace == 0);
                }
                else if(ref[0]){
                    temp = tiles.find(a => a.border.includes(ref[0].tile) && (a.border.length == 3 || a.border.length == 2) && a.inplace == 0);
                }
                else{
                    temp = tiles.find(a => a.border.includes(ref[1].tile) && (a.border.length == 3 || a.border.length == 2) && a.inplace == 0);
                }
            }

            temp.inplace = 1;
            image[row][col] = temp; 
        }
    }
}

function getCorners(){
    return tiles.filter(a => a.border.length == 2)
                .map(a => parseInt(a.tile))
                .reduce((a, b) => a * b);
}



//let sub = new Map(tilesEdges);
//sub.delete('2311');

//console.log(sub);

console.log('Part 1:', getCorners());
console.log(image);