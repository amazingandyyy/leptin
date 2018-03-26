import TransactionPool from './transaction-pool';
import Wallet from './index';
import Blockchain from '../blockchain';

describe('TransactionPool', () => {
  let tp;
  let wallet;
  let transaction;
  let bc;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    bc = new Blockchain();
    transaction = wallet.createTransaction('ri2daf9uf', 30, bc, tp);
  });

  it('adds a transaction to the pool', () => {
    expect(tp.transactions.find(t => t.tx === transaction.tx)).toEqual(transaction);
  });

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = JSON.stringify(transaction.update(wallet, 'ri2af3920', 35));
    tp.updateTransaction(transaction);
    expect(JSON.stringify(tp.transactions.find(t => t.tx === transaction.tx))).not.toEqual(oldTransaction);
    expect(JSON.stringify(tp.transactions.find(t => t.tx === transaction.tx))).toEqual(newTransaction);
  });

  it('clear transactions', () => {
    tp.clear();
    expect(tp.transactions).toEqual([]);
  });

  describe('mixing valid and bad transactions', () => {
    let validTransactions;

    beforeEach(() => {
      validTransactions = [...tp.transactions];
      for (let i = 0; i < 6; i++) {
        wallet = new Wallet();
        transaction = wallet.createTransaction('aflk4', 20, bc, tp);
        if (i % 2 === 0) {
          transaction.input.amount = 8888;
        } else {
          validTransactions.push(transaction);
        }
      }
    });

    it('shows a difference between valid and bad transaction', () => {
      expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
    });

    it('picks up the valid transactions', () => {
      expect(JSON.stringify(tp.validTransactions())).toEqual(JSON.stringify(validTransactions));
    });
  });
});