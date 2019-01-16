const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
  let tp, transaction, wallet;
  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction = wallet.createTransaction('rec134nt', 30, tp);
  });
  it('trading register addition test', () => {
    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  });
  it('trading register update test', () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = transaction.update(wallet, 'foo-ew145', 40);
    tp.updateOrAddTransaction(newTransaction);
    expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
      .not.toEqual(oldTransaction);
  });

  describe('normal / irregularity', () => {
    let validTransactions;
    beforeEach( () => {
      validTransactions = [...tp.transactions];
      for(let i = 0; i < 6; i++) {
        wallet = new Wallet();
        transaction = wallet.createTransaction('rec134nt', 30, tp);
        if(i%2 === 0) {
          transaction.input.amount = 9999;
        } else {
          validTransactions.push(transaction);
        }
      }
    });

    it('trading register and transaction validation list test', () => {
      expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
    })
    it('transaction validation list test', () => {
      expect(tp.validTransactions()).toEqual(validTransactions);
    });
  });
});
