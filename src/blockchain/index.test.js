import Block from './block';
import Blockchain from './index';

describe('Blockchain', () => {
  let bc;
  let bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('starts with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data = 'andy';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it('validates a valid chain', () => {
    bc2.addBlock('andy');
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalidates a chain with bad genesis block', () => {
    bc2.chain[0] = new Block('bad', 'bad', 'bad', []);
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('invalidates a chain with a bad block', () => {
    bc2.addBlock('andy');
    bc2.chain[1].data = 'andyyy';
    expect(bc.isValidChain(bc2.chain)).toBe(false); // because the has is wrong
  });

  it('doesnt replace chain with a invalid chain', () => {
    bc.addBlock('andy');
    const bcchain = bc.chain.slice();
    bc2.addBlock('andy');
    bc2.chain[1].data = 'andyyy';
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
    expect(bc.chain).toEqual(bcchain);
  });

  it('doesnt replace chain with a valid but shorter chain', () => {
    bc.addBlock('andy');
    bc.addBlock('andy2');
    const bcchain = bc.chain.slice();
    bc2.addBlock('andy');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
    expect(bc.chain).toEqual(bcchain);
  });

  it('replaces chain with a valid and longer chain', () => {
    bc.addBlock('andy');
    bc2.addBlock('andy');
    bc2.addBlock('andy2');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });
});