import Wallet from './index';
import TransactionPool from './transaction-pool';
import Blockchain from '../blockchain';

describe('Wallet', () => {
  let wallet;
  let tp;
  let bc;

  beforeEach(() => {
    wallet = new Wallet();
    tp = new TransactionPool();
    bc = new Blockchain();
  });

  describe('creating a transaction', () => {
    let transaction;
    let sendAmount;
    let recipient;

    beforeEach(() => {
      sendAmount = 50;
      recipient = '4fa7824hjad';
      transaction = wallet.createTransaction(recipient, sendAmount, bc, tp);
    });

    describe('doing the same transaction', () => {
      beforeEach(() => {
        transaction = wallet.createTransaction(recipient, sendAmount, bc, tp);
      });

      it('doubles `sendAmount` substracuted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
          .toEqual(wallet.balance - sendAmount - sendAmount);
      });

      it('clones `sendAmount` output for the recipient', () => {
        expect(transaction.outputs.filter(output => output.address === recipient)
          .map(output => output.amount))
          .toEqual([sendAmount, sendAmount]);
      });
    });
  });
});