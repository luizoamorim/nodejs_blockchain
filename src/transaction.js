const SHA256 = require("crypto-js/sha256");
const EC = require('elliptic').ec;


class Transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signInKey){
        if(signInKey.getPublic('hex') !== this.fromAddress){
            throw new Error('You cannot sing transactions for other wallets!')
        }

        const hashTx = this.calculateHash();
        const sig = signInKey.sign(hashTx, 'base64');
        /**
         * DER - https://en.wikipedia.org/wiki/X.690#DER_encoding
         * The distinguished encoding rules is more suitable than the canonical
         * encoding rules if the encoded value is small enough to fit into the 
         * available memory and there is a need to rapidly skip over some 
         * nested values. 
         */
        this.signature = sig.toDER('hex');
    }

    /**
     * @description Verify if the transaction was signed by the current
     * publicKey (fromAddress)
     */
    isValid(){
        // Rewards transaction
        if(this.fromAddress === null) return true;

        if(!this.signature || this.signature.length === 0){
            throw new Error('No signature in this transaction');
        }

        const ec = new EC('secp256k1');
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

module.exports = Transaction;