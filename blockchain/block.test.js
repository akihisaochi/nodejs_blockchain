const Block = require('./block');

describe('Block', () => {

  let data, lastBlock, block;

  beforeEach( () => {
    data = 'akihisaochi';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it(`data test`, () => {
    expect(block.data).toEqual(data);
  });
  it(`hash test`, () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });
  it(`checking DIFFICLTY of hash generation`, () => {
    expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
    console.log(block.toString());
  });
  it(`block mine difficluty down`, () => {
    expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1);
  });
  it(`block mine difficulty up`, () => {
    expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1);
  });

});
