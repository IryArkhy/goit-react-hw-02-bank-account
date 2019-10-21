/*eslint-disable */
import React, { Component } from 'react';
import T from 'prop-types';
import shortid from 'shortid';
import Controls from '../Controls';
import Balance from '../Balance';
import Transactions from '../TransactionHistory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const TRANSACTIONS = {
  DEPOSIT: 'Deposit',
  WITHDRAW: 'Withdraw',
};

const MESSAGES = {
  NOT_ENOUGH_MONEY: 'На счету недостаточно средств для проведения операции!',
  ENTER_THE_AMOUNT: 'Введите сумму для проведения операции!',
  SUCCESSFULL: 'Транзакция прошла успешно!',
};

class Dashboard extends Component {
  static defaultProps = {
    transactions: [],
    balance: 0,
  };

  static propTypes = {
    transactions: T.arrayOf(
      T.shape({
        id: T.string.isRequired,
        type: T.string.isRequired,
        amount: T.number.isRequired,
        date: T.string.isRequired,
      }).isRequired,
    ),
    balance: T.number,
  };

  state = {
    transactions: [],
    balance: 0,
  };

  onTransaction = (amount, transactionType) => {
    if (amount === '' || amount === 0) {
      toast(MESSAGES.ENTER_THE_AMOUNT);
      return;
    }
    const date = new Date();
    const amountConvertToFloat = parseFloat(amount);
    const transaction = {
      id: shortid.generate(),
      type: transactionType,
      amount: amountConvertToFloat,
      date: date.toLocaleString(),
    };

    transactionType === TRANSACTIONS.DEPOSIT
      ? this.setState(state => ({
          transactions: [...state.transactions, transaction],
          balance: state.balance + transaction.amount,
        }))
      : this.setState(state => ({
          transactions: [...state.transactions, transaction],
          balance: state.balance - transaction.amount,
        }));

    toast.success(MESSAGES.SUCCESSFULL);
    return transaction;
  };

  onDeposit = amount => {
    this.onTransaction(amount, TRANSACTIONS.DEPOSIT);
  };

  onWithdraw = amount => {
    if (amount > this.state.balance) {
      toast.error(MESSAGES.NOT_ENOUGH_MONEY);
      return;
    }
    this.onTransaction(amount, TRANSACTIONS.WITHDRAW);
  };

  count = criterion => {
    const { transactions } = this.state;
    const filteredItems = transactions.filter(
      transaction => transaction.type === criterion,
    );

    return filteredItems.reduce((acc, item) => acc + item.amount, 0);
  };

  countTotalIncome = () => {
    return this.count(TRANSACTIONS.DEPOSIT);
  };

  countTotalExpences = () => {
    return this.count(TRANSACTIONS.WITHDRAW);
  };

  render() {
    const { balance, transactions } = this.state;
    return (
      <div className="dashboard">
        <Controls onDeposit={this.onDeposit} onWithdraw={this.onWithdraw} />
        <Balance
          balance={balance}
          income={this.countTotalIncome}
          expenses={this.countTotalExpences}
        />
        <Transactions items={transactions} />
      </div>
    );
  }
}

export default Dashboard;
