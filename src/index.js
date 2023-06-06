import Block from './blockchain/block';

const genesis = Block.genesis();
const newBlock = Block.mineBlock(genesis, 'amazingandyyy');
console.log(newBlock.toString());
