const EC = require('elliptic').ec;

/**
 * You can choose your favorit elliptical curve algorithm, but we'll
 * use the secp256k1. This is the EC used by bitcoin.
 * https://en.bitcoin.it/wiki/Secp256k1
 */
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log();
console.log(`Public key: ${publicKey}`);

console.log();
console.log(`Private key: ${privateKey}`);