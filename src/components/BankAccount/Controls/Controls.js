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
    moneyAmount: 0,
  };

  handleDeposit = () => {
    this.props.onDeposit(this.state.moneyAmount);
    this.setState({ moneyAmount: 0 });
  };

  handleWithdraw = () => {
    this.props.onWithdraw(this.state.moneyAmount);
    this.setState({ moneyAmount: 0 });
  };

  handleChange = e => {
    this.setState({
      moneyAmount: e.currentTarget.value,
    });
  };

  render() {
    const { moneyAmount } = this.state;
    return (
      <section className={styles.controls}>
        <input
          type="number"
          name="amount"
          value={moneyAmount}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.handleDeposit}>
          Deposit
        </button>
        <button type="button" onClick={this.handleWithdraw}>
          Withdraw
        </button>
      </section>
    );
  }
}

export default Controls;
