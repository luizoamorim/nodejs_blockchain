export class Block {
    
    private timestamp: Date;

    constructor(timestamp: Date, data, previousHash = ''){
        this.timestamp = timestamp;
    }
}