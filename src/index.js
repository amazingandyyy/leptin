import Block from './blockchain/block';

const genesis = Block.genesis();
const newBlock = Block.mineBlock(genesis, 'andy');
console.log(newBlock.toString());