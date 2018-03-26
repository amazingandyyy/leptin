import Block from './block';
import { MINE_RATE } from '../config';

describe('Block', () => {
  let data;
  let lastBlock;
  let block;

  beforeEach(() => {
    data = 'andy';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it('sets the `data` to match the input', () => {
    expect(block.data).toEqual(data);
  });

  it('sets the `lastHash` to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

  it('generates a hash that matches the difficulty', () => {
    expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
  });

  it('lowers the difficulty for too hard blocks', () => {
    expect(Block.adjustDifficulty(block, block.timestamp + MINE_RATE * 10)).toEqual(block.difficulty - 1);
  });

  it('rise the difficulty for too easy blocks', () => {
    expect(Block.adjustDifficulty(block, block.timestamp - MINE_RATE * 10)).toEqual(block.difficulty + 1);
  });
});