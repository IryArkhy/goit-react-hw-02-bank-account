/*eslint-disable */
import React, { Component } from 'react';
import T from 'prop-types';
import shortid from 'shortid';
import Controls from '../Controls';
import Balance from '../Balance';
import Transactions from '../TransactionHistory';
import { toast } from 'react-toastify';
import storage from '../../../services/localStorage';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Transaction = {
  DEPOSIT: 'Deposit',
  WITHDRAW: 'Withdraw',
};

const Message = {
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

  componentDidMount() {
    const transactions = storage.get('transactions');
    const balance = storage.get('balance');
    if (transactions && balance) {
      this.setState({ transactions, balance });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.transactions !== this.state.transactions) {
      storage.save('transactions', this.state.transactions);
      storage.save('balance', this.state.balance);
    }
  }

  createTransaction = (amount, transactionType) => {
    const date = new Date();
    const amountConvertToFloat = parseFloat(amount);
    const transaction = {
      id: shortid.generate(),
      type: transactionType,
      amount: amountConvertToFloat,
      date: date.toLocaleString(),
    };

    return transaction;
  };

  onDeposit = amount => {
    if (amount === '' || amount <= 0) {
      toast(Message.ENTER_THE_AMOUNT);
      return;
    }
    const transaction = this.createTransaction(amount, Transaction.DEPOSIT);
    this.setState(state => ({
      transactions: [...state.transactions, transaction],
      balance: state.balance + transaction.amount,
    }));
    toast.success(Message.SUCCESSFULL);
  };

  onWithdraw = amount => {
    if (amount === '' || amount <= 0) {
      toast(Message.ENTER_THE_AMOUNT);
      return;
    }
    if (amount > this.state.balance) {
      toast.error(Message.NOT_ENOUGH_MONEY);
      return;
    }
    const transaction = this.createTransaction(amount, Transaction.WITHDRAW);

    this.setState(state => ({
      transactions: [...state.transactions, transaction],
      balance: state.balance - transaction.amount,
    }));
    toast.success(Message.SUCCESSFULL);
  };

  countMoneyFlow = () => {
    const { transactions } = this.state;

    return transactions.reduce(
      (acc, transaction) => {
        acc[transaction.type] += transaction.amount;
        return acc;
      },
      {
        Deposit: 0,
        Withdraw: 0,
      },
    );
  };

  render() {
    const { balance, transactions } = this.state;
    const income = this.countMoneyFlow().Deposit;
    const expenses = this.countMoneyFlow().Withdraw;
    return (
      <div className="dashboard">
        <Controls onDeposit={this.onDeposit} onWithdraw={this.onWithdraw} />
        <Balance balance={balance} income={income} expenses={expenses} />
        <Transactions items={transactions} />
      </div>
    );
  }
}

export default Dashboard;
