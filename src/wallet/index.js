import { INITAL_BALANCE } from '../config';
import Util from '../utility';
import Transaction from './transaction';

class Wallet {
  constructor() {
    this.balance = INITAL_BALANCE;
    this.keyPair = Util.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet -
      publicKey:  ${this.publicKey.toString()}
      balance:    ${this.balance}
    `;
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  verify(sig) {
    return this.keyPair.verify(sig);
  }

  calculateBalance(blockchain) {
    let { balance } = this;
    const transactions = [];
    let startTime = 0;

    blockchain.chain.forEach(block => {
      block.data.forEach(transaction => {
        transactions.push(transaction);
      });
    });

    const walletInputTs = transactions.filter(transaction => transaction.input.address === this.publicKey);
    if (walletInputTs.length > 0) {
      const recentInputT = walletInputTs.reduce((prev, current) => {
        const result = prev.input.timestamp > current.input.timestamp ? prev : current;
        return result;
      });

      balance = recentInputT.outputs.find(output => output.address === this.publicKey).amount;
      startTime = recentInputT.input.timestamp;
    }

    transactions.forEach(transaction => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.forEach(output => {
          if (output.address === this.publicKey) {
            balance += output.amount;
          }
        });
      }
    });
    return balance;
  }

  createTransaction(recipient, amount, blockchain, transactionPool) {
    this.balance = this.calculateBalance(blockchain);
    if (amount > this.balance) {
      console.log(`\x1b[91m[transaction]\t ${amount} exceeds current balance ${this.balance}\x1b[0m`);
      return;
    }
    let transaction = transactionPool.existingTransaction(this.publicKey);
    if (transaction) {
      transaction.update(this, recipient, amount);
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.updateTransaction(transaction);
    }
    return transaction;
  }

  static blockchainWallet() {
    const blockchainWallet = new this();
    blockchainWallet.address = 'blockchainWallet';
    return blockchainWallet;
  }
}

export default Wallet;