const sample = '389125467';
const input = '716892543';

class LinkedList{
    constructor(data){
        this.data = data;
        this.next = null;
    }

    find(data){
        let current = this;
        while(current){
            if(current.data === data) return current;
            current = current.next;
        }
        return false;
    }

    findIndex(data){
        let current = this, idx = 0;
        while(current){
            if(current.data === data) return idx;
            current = current.next;
            idx++;
        }
        return -1;
    }

    splice(startIdx, length = 0){
        let slow, current = this, idx = 0;
        while(current){
            if(idx === startIdx){
                if(length === 0){ slow.next = null; return current; }

                let cut = current;
                idx = 1;
                while(current){
                    if(idx === length){
                        slow.next = current.next;
                        current.next = null;
                        return cut;
                    }
                    current = current.next;
                    idx++;
                }
            }
            slow = current;
            current = current.next;
            idx++;
        }
    }

    insertNext(data){
        let current = this, temp = this.next;
        this.next = data;
        while(current.next){
            current = current.next;
        }
        current.next = temp;
        return this;
    }

    pushHeadtoTail(){
        let temp = this.data;
        [this.data, this.next] = [this.next.data, this.next.next];

        let current = this;
        while(current.next) current = current.next;

        current.next = new LinkedList(temp);

        return this;
    }

    shift(){
        let temp = this.data;
        [this.data, this.next] = [this.next.data, this.next.next];
        return temp;
    }

    get toArray(){
        let temp = [], current = this;
        while(current){
            temp.push(current.data);
            current = current.next;
        }
        return temp;
    }
}

function crabCups(setup, upper){
    let pick = setup.splice(1,3),
        destination; // current is always at index 0, therefore 3 picks are to be spliced from index 1
    
    for(let i = 1;; i++){
        destination = setup.data - i;
        if(destination <= 0) destination = upper + destination;
        
        if(!pick.find(destination)) break;
    }
    
    setup.find(destination).insertNext(pick);
    setup.pushHeadtoTail();
    
    return setup;
}

function play(n = 10){
    let list, current, order = sample.split('').map(Number), limit = Math.max(...order);
    
    for(let num of order){
        let temp = new LinkedList(num);
        if(!list){
            list = temp;
            current = temp;
        }
        else{
            current.next = temp;
            current = current.next;
        }
    }
    
    for(let i = 0; i < n; i++) crabCups(list, limit);
    
    while(list.data != 1) list.pushHeadtoTail();
    list.shift();

    return list.toArray.join('');
}

function play2(n = 10){
    let list, current, order = sample.split('').map(Number), max = Math.max(...order);
    order = order.concat(Array(1000000 - order.length).fill().map((_, i) => max + 1 + i));

    for(let num of order){
        let temp = new LinkedList(num);
        if(!list){
            list = temp;
            current = temp;
        }
        else{
            current.next = temp;
            current = current.next;
        }
    }

    for(let i = 0; i < n; i++) crabCups(list, 1000000);
    
    let target = list.find(1);

    return [target.next.data, target.next.next.data];
}

console.log('Part 1:', play(100));
console.log(play2(1000));