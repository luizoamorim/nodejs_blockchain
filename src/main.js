const Blockchain = require("./blockchain");
const Block = require("./block");
const Transaction = require("./transaction");


let myPrivateBlockchain = new Blockchain();

myPrivateBlockchain.createTransaction(new Transaction('address1', 'address2', 100));
myPrivateBlockchain.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the miner...');
myPrivateBlockchain.minePendingTransactions('xavier-address');

/** The xavier balance will be zero, because we create a new transaction to pay he.
* So we need to mine again.
*/
console.log(`Balance of xavier is ${myPrivateBlockchain.getBalanceOfAddress('xavier-address')}`);

console.log('Starting the miner again...');
myPrivateBlockchain.minePendingTransactions('xavier-address');

console.log(`Balance of xavier is ${myPrivateBlockchain.getBalanceOfAddress('xavier-address')}`);


