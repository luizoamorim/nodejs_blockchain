const Blockchain = require("./blockchain");
const Block = require("./block");


let myPrivateBlockchain = new Blockchain();

console.log('Mining block 1...');
myPrivateBlockchain.addBlock(new Block({ ammount: 10 }))

console.log('Mining block 2...');
myPrivateBlockchain.addBlock(new Block({ ammount: 50 }))

