const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain {        

    constructor(){
        this.chain = [this.createGenesisBlock()];

        /**
         * Block difficulty
         * The quantity of zeros in the hash begin will be the difficulty level
         * to miner the block. 
        */        
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock = () => {
        return new Block('This is the genesis block', '0');
    }

    getLatestBlock = () => {
        return this.chain[this.chain.length-1];
    }

    /**
     * Here we're adding all the pending transactions, but be aware in the
     * real world. In criptocurrencies like bitcoin it is impossible to 
     * storage all transactions in one block.
     * @param {*} miningRewardAddress 
     */
    minePendingTransactions(miningRewardAddress){
        let block = new Block(this.pendingTransactions)
        block.mineBlock(this.difficulty);
        
        console.log('Block successfully mined!')
        this.chain.push(block)

        /**
         * Now we'll reset the pendingTransactions array and add a new
         * transaction which will transfer the reward for the miner.
         * The fromAddress is null because the reward is gave from the own
         * blockchain system in our example.
         */
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    validate() {                
        for(let i = 1 ; i < this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            console.log(currentBlock)
            console.log(currentBlock.generateHash())

            if(currentBlock.hash !== currentBlock.generateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

            return true;
        }
    }    
}

module.exports = Blockchain;