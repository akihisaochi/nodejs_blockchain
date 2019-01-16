const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
  let bc, bc2;
  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('start genesis block', () => {
    expect(bc.chain[bc.chain.length -1]).toEqual(Block.genesis());
  });
  it('add block', () => {
    const data = 'hoge';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });
  it('validate a valid chain', () => {
    bc2.addBlock('hoge');
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });
  it('invalidate a chain with a current genesis block', () => {
    bc2.chain[0].data = 'bad data';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });
  it('invalidates a corrupt chain', () => {
    bc2.addBlock('correct');
    bc2.chain[1].data = 'corrupt';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });
  it('blockchain updatetest', () => {
    bc2.addBlock('update');
    bc.replaceChain(bc2.chain);
    expect(bc.chain).toEqual(bc2.chain);
  });
  it('blockchain omit test', () => {
    bc.addBlock('omit');
    bc.replaceChain(bc2.chain);
    expect(bc.chain).not.toEqual(bc2.chain);
  });

});
