const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');
const Blockchain = require('../blockchain');

describe('Wallet', () => {
  let wallet, tp, blockchain;
  beforeEach( () => {
    wallet = new Wallet();
    tp = new TransactionPool();
    blockchain = new Blockchain();
  });

  describe('trade create test', () => {
    let transaction, sendAmount, recipient;
    beforeEach(() => {
      sendAmount = 50;
      recipient = 'r39310-3ndrs';
      transaction = wallet.createTransaction(recipient, sendAmount, blockchain, tp);
    });
    describe('Identical transaction generation test', () => {
      beforeEach(() => {
        wallet.createTransaction(recipient, sendAmount, blockchain, tp);
      });
      it('It is doubled from the balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
          .toEqual(wallet.balance - sendAmount*2);
      });
      it('destination amount posting test', () => {
        expect(transaction.outputs.filter(output => output.address === recipient)
        .map(output => output.amount)).toEqual([sendAmount, sendAmount]);
      });
    });
  });
});
