import Block from './block';

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);
    return block;
  }

  replaceChain(chain) {
    if (!this.isValidChain(chain)) {
      console.log('\x1b[91m[blockchain]\t reject incoming blockchain\x1b[0m');
      return;
    }
    if (chain.length <= this.chain.length) {
      console.log('\x1b[90m[blockchain]\t blockchain synced\x1b[0m');
      return;
    }
    console.log('\x1b[33m[blockchain]\t blockchain updated\x1b[0m');
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