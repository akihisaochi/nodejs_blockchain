const Transaction = require('./transaction');
const Wallet = require('./index');

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
});
