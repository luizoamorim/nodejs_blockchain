const Blockchain = require("./blockchain");
const Block = require("./block");


let myPrivateBlockchain = new Blockchain();

myPrivateBlockchain.addBlock(new Block({ ammount: 10 }))
myPrivateBlockchain.addBlock(new Block({ ammount: 50 }))

console.log(JSON.stringify(myPrivateBlockchain, null, 4))

