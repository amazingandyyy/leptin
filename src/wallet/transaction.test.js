import Transaction from './transaction';
import Wallet from './index';

describe('Transaction', () => {
  let transaction;
  let wallet;
  let recipient;
  let amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = '0deudaf253';
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it('outputs the `amount` from the wallet balance', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
  });

  it('outputs the `amount` to the recipient', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount)
      .toEqual(amount);
  });

  describe('transacting with an amount that exceeds the balance', () => {
    beforeEach(() => {
      amount = 1000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });
    it('does not create the transaction', () => {
      expect(transaction).toEqual(undefined);
    });
  });
});