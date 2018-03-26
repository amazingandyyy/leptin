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

  it('intputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it('validate a valid transation', () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });

  it('invalidate a invalid transation', () => {
    transaction.outputs[0].amount = 0;
    expect(Transaction.verifyTransaction(transaction)).toBe(false);
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

  describe('updating a transaction', () => {
    let newRecipient;
    let newAmount;

    beforeEach(() => {
      newRecipient = 'dn399dhadjkf';
      newAmount = 30;
      transaction = transaction.update(wallet, newRecipient, newAmount);
    });

    it('substracts the new amount from the sender\'s output', () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(wallet.balance - amount - newAmount);
    });

    it('outputs an amount for the next recipient', () => {
      expect(transaction.outputs.find(output => output.address === newRecipient).amount)
        .toEqual(newAmount);
    });
  });
});