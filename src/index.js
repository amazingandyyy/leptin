import Block from './block';

const genesis = Block.genesis();
const newBlock = Block.mineBlock(genesis, 'andy');
console.log(newBlock.toString());