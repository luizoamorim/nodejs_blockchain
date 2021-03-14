export class Block {
    
    #timestamp: Date;
    #data: {};
    #previousHash: String;
    #hash: String;

    constructor(timestamp: Date, data: {}, previousHash = ''){
        this.#timestamp = timestamp;
        this.#data = data;
        this.#previousHash = previousHash;
        this.#hash = ''
    }
}