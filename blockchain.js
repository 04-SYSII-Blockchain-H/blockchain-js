
const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(index,timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash =previousHash;
        this.hash = '';
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();

    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "15.12.2011", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}


let newCurrr = new Blockchain();
newCurrr.addBlock(new Block(1,"16.01.2022", {amount:4}));
newCurrr.addBlock(new Block(2,"17.01.2022", {amount:10}));

newCurrr.chain[1].data = {amout :200};

//console.log(JSON.stringify(newCurrr, null, 4));

console.log("is blockchain valid?" + newCurrr.isChainValid());