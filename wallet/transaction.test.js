const Transaction = require('./transaction');
const Wallet = require('./index');
const { MINING_REWARD } = require('../config');

describe('Transaction', () => {
  let transaction, wallet, receipient, amount;
  beforeEach( () => {
    wallet = new Wallet();
    amount = 50;
    receipient = 'testReceipient123456';
    transaction = Transaction.newTransaction(wallet, receipient, amount);
  });
  it('balance deduction test', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
      .toEqual(wallet.balance - amount);
  });
  it('money transfer test', () => {
    expect(transaction.outputs.find(output => output.address === receipient).amount)
      .toEqual(amount);
  });
  it('transaction signature test', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });
  it('test of normal transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });
  it('test of dengerous transaction', () => {
    transaction.outputs[0].amount = 5555;
    expect(Transaction.verifyTransaction(transaction)).toBe(false);
  });

  describe('overdraft test', () => {
    beforeEach( () => {
      amount = 50000;
      transaction = Transaction.newTransaction(wallet, receipient, amount);
    });
    it('trading shortage test', () => {
      expect(transaction).toEqual(undefined);
    });
  });
  describe('update test', () => {
    let nextAmount, nextReceipient;

    beforeEach(() => {
      nextAmount = 20;
      nextReceipient = 'n32st-13rpi4nt';
      transaction = transaction.update(wallet, nextReceipient, nextAmount);
    });
    it('transaction amount subtraction test', () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(wallet.balance - amount - nextAmount);
    });
    it('destination transaction amoun test', () => {
      expect(transaction.outputs.find(output => output.address === nextReceipient).amount)
        .toEqual(nextAmount);
    });
  });
  describe('reward create', () => {
    beforeEach(() => {
      trsansaction = Transaction.rewardTransaction(wallet, Wallet.blockchainWallet());
    });
    it('mining and reward test', () => {
      console.info(wallet.publicKey);
      console.info(transaction.outputs);
      expect(transaction.outputs.find(output => output.address === receipient).amount)
        .toEqual(MINING_REWARD);
    });
  });
});
