const Block = require('./block')

class Blockchain {        

    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock = () => {
        return new Block('This is the genesis block', '0');
    }

    getLatestBlock = () => {
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.generateHash();
        this.chain.push(newBlock)
    }
    
}

module.exports = Blockchain;