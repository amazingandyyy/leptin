import Util from '../utility';

class Transaction {
  constructor() {
    this.tx = Util.tixId();
    this.input = null;
    this.outputs = [];
  }
  static newTransaction(senderWallet, recipientAddr, amount) {
    const transcation = new this();
    if (amount > senderWallet.balance) {
      console.log(`\x1b[91m[transaction]\t ${amount} exceed balance\x1b[0m`);
      return;
    }
    transcation.outputs.push(...[
      {
        amount: senderWallet.balance - amount,
        address: senderWallet.publicKey
      },
      {
        amount,
        address: recipientAddr
      }
    ]);
    Transaction.signTransaction(transcation, senderWallet);

    return transcation;
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      time: Date.now(), // 1970
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(Util.hash(transaction.outputs))
    };
  }

  static verifyTransaction(transaction) {
    return Util.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      Util.hash(transaction.outputs)
    );
  }
}

export default Transaction;