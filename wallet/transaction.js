const ChainUtil = require('../chain-util');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, receipient, amount) {
    const senderOutput = this.outputs.find(output => output.address === senderWallet.piblicKey);

    if (amount > senderOutput.amount) {}
  }

  static newTransaction(senderWallet, receipient, amount) {
    if(amount > senderWallet.balance) {
      console.log(`money: ${amount} is exceeded`);
      return;
    }

    const transaction = new this();
    transaction.outputs.push(...[
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: receipient }
    ]);

    this.signTransaction(transaction, senderWallet);

    return transaction;
  }
  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    };
  }
  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }
}

module.exports = Transaction;
