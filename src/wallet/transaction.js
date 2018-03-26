import Util from '../utility';

class Transaction {
  constructor() {
    this.tx = Util.tixId();
    this.input = null;
    this.outputs = [];
  }
  static newTransaction(senderWallet, recipient, amount) {
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
        address: recipient
      }
    ]);
    Transaction.signTransaction(transcation, senderWallet);

    return transcation;
  }

  update(senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

    if (amount > senderOutput.amount) {
      console.log(`\x1b[91m[transaction]\t ${amount} exceed balance\x1b[0m`);
      return;
    }

    senderOutput.amount -= amount;
    this.outputs.push({ amount, address: recipient });
    Transaction.signTransaction(this, senderWallet);

    return this;
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