const SHA256 = require('crypto-js/sha256');

class Block {
    
    constructor(data, previousHash = ''){
        this.timestamp = new Date().getTime().toString();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
        this.nonce = 0;
    }

    /**
     * The hash is generated based in all blocks that already exist in the 
     * chain. These hash is a fingerprint which can be used to identify this 
     * block on the future.
     * 
     * Any modification in any block changes its hash and, consequently, all
     * subsequent blocks become invalid. In this way, for the blockchain to 
     * become valid again, a new proof of work must be generated again for the 
     * modified block and all subsequent ones.
     */
    generateHash() {                
        return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
            this.nonce++;
            this.hash = this.generateHash();
        }

        console.log(`Block mined: ${this.hash}`)
    }
}

module.exports = Block;