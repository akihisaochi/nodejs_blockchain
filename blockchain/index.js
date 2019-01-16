const Block = require('./block');

class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
  }
  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);
    return block;
  }
  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for(let i = 1; i < chain.length; i++) {
      const thisBlock = chain[i];
      const lastBlock = chain[i-1];
      if(
          thisBlock.lastHash !== lastBlock.hash ||
          thisBlock.hash !== Block.blockHash(thisBlock)
        ) {
        return false;
      }
    }
    return true;
  }
  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log('I omit it because of the number of blocks.');
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log('I omit it because of blockchain data incomplete.');
      return;
    }
    console.log('update blockchain');
    this.chain = newChain;
  }
}
module.exports = BlockChain;
