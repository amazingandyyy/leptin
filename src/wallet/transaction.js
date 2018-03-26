import Util from '../utility';
import { MINING_REWARDS } from '../config';

class Transaction {
  constructor() {
    this.tx = Util.tixId();
    this.input = null;
    this.outputs = [];
  }

  static transactionWithOutput(senderWallet, outputs) {
    const transaction = new this();
    transaction.outputs.push(...outputs);
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static newTransaction(senderWallet, recipient, amount) {
    if (amount > senderWallet.balance) {
      console.log(`\x1b[91m[transaction]\t ${amount} exceeds current balance ${senderWallet.balance}\x1b[0m`);
      return;
    }

    return this.transactionWithOutput(senderWallet, [
      {
        amount: senderWallet.balance - amount,
        address: senderWallet.publicKey
      },
      {
        amount,
        address: recipient
      }
    ]);
  }

  static rewardsMiner(minerWallet, blockchainWallet) {
    return this.transactionWithOutput(blockchainWallet, [
      {
        amount: MINING_REWARDS,
        address: minerWallet.publicKey
      }
    ]);
  }

  update(senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

    if (amount > senderOutput.amount) {
      console.log(`\x1b[91m[transaction]\t ${amount} exceeds current balance ${senderOutput.amount}\x1b[0m`);
      return;
    }

    senderOutput.amount -= amount;
    this.outputs.push({ amount, address: recipient });
    Transaction.signTransaction(this, senderWallet);

    return this;
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(), // 1970
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