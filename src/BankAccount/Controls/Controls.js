import React, { Component } from 'react';
import T from 'prop-types';
import { toast } from 'react-toastify';
import styles from './Controls.module.css';

toast.configure();

class Controls extends Component {
  static propTypes = {
    onDeposit: T.func.isRequired,
    onWithdraw: T.func.isRequired,
  };

  state = {
    moneyAmount: '',
  };

  handleChange = e => {
    this.setState({
      moneyAmount: e.currentTarget.value,
    });
    setTimeout(() => {
      this.setState({ moneyAmount: '' });
    }, 4000);
  };

  render() {
    const { moneyAmount } = this.state;
    const { onDeposit, onWithdraw } = this.props;
    return (
      <section className={styles.controls}>
        <input
          type="number"
          name="amount"
          value={moneyAmount}
          onChange={this.handleChange}
        />
        <button type="button" onClick={() => onDeposit(moneyAmount)}>
          Deposit
        </button>
        <button type="button" onClick={() => onWithdraw(moneyAmount)}>
          Withdraw
        </button>
      </section>
    );
  }
}

export default Controls;
