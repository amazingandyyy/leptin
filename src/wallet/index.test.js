import Wallet from './index';
import TransactionPool from './transaction-pool';
import Blockchain from '../blockchain';
import { INITAL_BALANCE } from '../config';

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

  describe('calculate a balance', () => {
    let addBalance;
    let repeatAdd;
    let senderWallet;
    beforeEach(() => {
      senderWallet = new Wallet();
      addBalance = 20;
      repeatAdd = 3;
      for (let i = 0; i < repeatAdd; i++) {
        senderWallet.createTransaction(wallet.publicKey, addBalance, bc, tp);
      }
      bc.addBlock(tp.transactions);
    });

    it('calculate the balance for blockchain transactions matching the recipient', () => {
      expect(wallet.calculateBalance(bc)).toEqual(INITAL_BALANCE + (addBalance * repeatAdd));
    });

    it('calculate the balance for blockchain transactions matching the sender', () => {
      expect(senderWallet.calculateBalance(bc)).toEqual(INITAL_BALANCE - (addBalance * repeatAdd));
    });

    describe('the cecipient conducts a transaction', () => {
      let substractBalance;
      let recipientBalance;

      beforeEach(() => {
        tp.clear();
        substractBalance = 60;
        recipientBalance = wallet.calculateBalance(bc);
        wallet.createTransaction(senderWallet.publicKey, substractBalance, bc, tp);
        bc.addBlock(tp.transactions);
      });

      describe('the sender sends another transaction to the recipient', () => {
        beforeEach(() => {
          tp.clear();
          senderWallet.createTransaction(wallet.publicKey, addBalance, bc, tp);
          bc.addBlock(tp.transactions);
        });

        it('calculate the recipient balance only using transactions since it\'s the most recent one', () => {
          expect(wallet.calculateBalance(bc)).toEqual(recipientBalance - substractBalance + addBalance);
        });
      });
    });
  });
});