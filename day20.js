const input = require('fs').readFileSync('day20-input.txt').toString().trim().replace(/#/g, '1').replace(/\./g, '0');
let tiles = [], image;

class Tile{
    constructor(tileNum, tileStrng){
        this.tile = tileNum;
        this.edges = [];
        this.border = [];
        this.forms = [];          // [[bitval, up, down, left, right]]
        this.inplace = 0;

        let temp = tileStrng.split('\r\n').map(a => a.split(''));

        this.edges.push(...[temp[0].join(''), temp[temp.length - 1].join(''),     //up, down
            temp.reduce((a, b) => a.concat(b[0]), []).join(''),    //left
            temp.reduce((a, b) => a.concat(b[temp.length - 1]), []).join(''),  //right
            [...temp[0]].reverse().join(''), [...temp[temp.length - 1]].reverse().join(''), //flipup, flip down
            temp.reduce((a, b) => a.concat(b[0]), []).reverse().join(''),  //flipleft
            temp.reduce((a, b) => a.concat(b[temp.length - 1]), []).reverse().join('')]); //flipr

        for(let i = 0; i < 8; i++){
            this.forms.push([JSON.parse(JSON.stringify(temp)), temp[0].join(''), temp[temp.length - 1].join(''),     //up, down
                temp.reduce((a, b) => a.concat(b[0]), []).join(''), temp.reduce((a, b) => a.concat(b[temp.length - 1]), []).join('')]);

            if(i == 3) temp.reverse();
            else temp = rotate(temp);
        }
    }
}

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement + this.substring(index + 1);
}

getTilesArrangement();

function getTilesArrangement(){
    for(let tile of input.split('\r\n\r\n')){                           ////creating Tile class for each tile and store to have a record
        let [, key, image] = tile.match(/^.*?(\d+):([\r\n\d]*)/), 
            temp = new Tile(key, image.trim());

        tiles.push(temp);
    }

    for(let i = 0; i < tiles.length; i++){                              ////determining the neighbors of each tile
        let subtiles = tiles.slice(0, i).concat(tiles.slice(i + 1));

        tiles[i].edges.slice(0,4).forEach(edge => {                     ////using the first 4-edges, (u,d,l,r), determines the tile
            for(let subtile of subtiles){                               ////neighbors. 2-corner tile, 3-edge tile, 4-mid tile
                if(subtile.edges.includes(edge)){
                    tiles[i].border.push([subtile.tile, edge]);
                    break;
                }
            }
        });
    }
    
    let grid = Math.sqrt(tiles.length), tilelength = tiles[0].edges[0].length;                                 ////temp positioning of each tile on an image, unknown orientation
    image = Array(grid).fill().map(_=>[]);

    for(let row = 0; row < grid; row++){
        for(let col = 0; col < grid; col++){
            let temp;

            if(col == 0 && row == 0){
                temp = tiles.find(a => a.border.length == 2);
            }
            else{
                let ref = [image[row][col - 1], row != 0 ? image[row - 1][col] : undefined];
                
                if(ref[0] && ref[1])
                    temp = tiles.find(a => a.border.map(b => b[0]).includes(ref[0].tile) && a.border.map(b => b[0]).includes(ref[1].tile) && a.inplace == 0);
                else if(ref[0])
                    temp = tiles.find(a => a.border.map(b => b[0]).includes(ref[0].tile) && (a.border.length == 3 || a.border.length == 2) && a.inplace == 0);
                else
                    temp = tiles.find(a => a.border.map(b => b[0]).includes(ref[1].tile) && (a.border.length == 3 || a.border.length == 2) && a.inplace == 0);
            }

            temp.inplace = 1;
            image[row][col] = temp; 
        }
    }

    let tempImage = JSON.parse(JSON.stringify(image));
    for(let row = 0; row < grid; row++){                // look for tile orientation relative to image that could satisfy the border constriction
        for(let col = 0; col < grid; col++){            // example. a tile with 321 at bottom border, look for form with 321 bottom
            let basis = [row  ? tempImage[row - 1][col].tile : undefined, tempImage[row + 1] ? tempImage[row + 1][col].tile : undefined,
                tempImage[row][col - 1] ? tempImage[row][col - 1].tile : undefined, tempImage[row][col + 1] ? tempImage[row][col + 1].tile : undefined]
                .map(a => {
                    if(a != undefined){
                        let temp = tempImage[row][col].border.find(b => b[0] == a)[1];
                        return new RegExp('(' + temp + ')|(' + temp.split('').reverse().join('') + ')');
                    }
                    else return new RegExp('.*');
                });

            image[row][col] = tempImage[row][col].forms.find(form => form.slice(1).every((edge, index) => basis[index].test(edge)))[0].slice(1, tilelength - 1).map(a => a.slice(1, tilelength - 1).join(''));
        }
    }

                                              
    tempImage = JSON.parse(JSON.stringify(image));          //combining tiles into string to form image (unoriented)
    image = [], temp = '';
    
    for(let i = 0; i < grid; i++){
        for(let j = 0; j < tilelength - 2; j++){
            for(let k = 0; k < grid; k++){
                temp += tempImage[i][k][j];
            }
            image.push(temp);
            temp = '';
        }
    }
}

function getCorners(){
    return tiles.filter(a => a.border.length == 2)
                .map(a => parseInt(a.tile))
                .reduce((a, b) => a * b);
}

function getNumFromMonsters(){
    let temp = [];
    for(let i = 0; i < 8; i++){
        if(findMonster(image)) temp.push(image.concat());
        if(i == 3) image.reverse()
        else image = rotate2(image);
    }

    temp = temp.map(a => {
        while(findMonster(a)){
            a = findMonster(a);
        }
        return a.reduce((a, b) => a + b.match(/1/g).length, 0);
    });
    
    return Math.min(...temp);
}

function rotate(a){
    let temp = Array(a.length).fill().map(_=>[]);
    for(let i = 0; i < a.length; i++){
        for(let j = 0; j < a.length; j++){
            temp[j].unshift(a[i].shift());
        }
    }

    return temp;
}

function rotate2(a){
    a = a.map(b => b.split(''));
    let temp = Array(a.length).fill().map(_=>[]);
    for(let i = 0; i < a.length; i++){
        for(let j = 0; j < a.length; j++){
            temp[j].unshift(a[i].shift());
        }
    }

    return temp.map(b => b.join(''));
}


function findMonster(grid){
    let temp = grid.concat();
    let midIndex = temp.findIndex(a => /1....11....11....111/.test(a));
    if(midIndex < 0) return false;

    let prefixLength = temp.find(a => /1....11....11....111/.test(a)).match(/(.*)1....11....11....111/)[1].length;

    if(new RegExp('.{' + prefixLength + '}.{18}1').test(temp[midIndex - 1]) && new RegExp('.{' + prefixLength + '}.1..1..1..1..1..1').test(temp[midIndex + 1])){
        temp[midIndex - 1] = temp[midIndex - 1].replaceAt(prefixLength + 18, 'O');
        for(let i of [0, 5, 6, 11, 12, 17, 18, 19]){
            temp[midIndex] = temp[midIndex].replaceAt(prefixLength + i, 'O');
        }
        for(let i of [1, 4, 7, 10, 13, 16]){
            temp[midIndex + 1] = temp[midIndex + 1].replaceAt(prefixLength + i, 'O');
        }
        return temp;
    }
    else return false;
}

console.log('Part 1:', getCorners());
console.log('Part 2:', getNumFromMonsters());
