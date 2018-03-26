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

    return transcation;
  }
}

export default Transaction;