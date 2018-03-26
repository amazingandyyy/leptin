import Transaction from './transaction';

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateTransaction(transaction) {
    const transactionsWithTxId = this.transactions.find(t => t.tx === transaction.tx);
    if (transactionsWithTxId) {
      this.transactions[this.transactions.indexOf(transactionsWithTxId)] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }

  existingTransaction(address) {
    return this.transactions.find(t => t.input.address === address);
  }

  validTransactions() {
    return this.transactions.filter(transaction => {
      const outputTotal = transaction.outputs.reduce((total, output) => total + output.amount, 0);

      if ((transaction.input.amount) !== outputTotal || !Transaction.verifyTransaction(transaction)) {
        if (process.env.NODE_ENV !== 'testing') console.log(`\x1b[91m[transaction]\t invalid transaction from ${transaction.input.address}\x1b[0m`);
        return false;
      }

      return true;
    });
  }

  clear() {
    this.transactions = [];
  }
}

export default TransactionPool;