import Block from './block';

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);
  }

  replaceChain(chain) {
    if (!this.isValidChain(chain)) {
      console.log('The newBlockchain is not valid');
      return;
    }
    if (chain.length <= this.chain.length) {
      console.log('The newBlockchain is no longer than the current chain.');
      return;
    }
    console.log('Relacing current chain with the newBlockchain.');
    this.chain = chain;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
      if (block.lastHash !== lastBlock.hash || block.hash !== Block.hashBlock(block)) {
        return false;
      }
    }
    return true;
  }
}

export default Blockchain;