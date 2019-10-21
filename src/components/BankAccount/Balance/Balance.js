import React from 'react';
import T from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => {
  return (
    <section className={styles.balance}>
      <span>&#8593; </span>
      <span>{income}$</span>
      <span>&#8595; </span>
      <span>{expenses}$</span>
      <span>Balance: {balance}$</span>
    </section>
  );
};

Balance.propTypes = {
  balance: T.number.isRequired,
  income: T.number.isRequired,
  expenses: T.number.isRequired,
};

export default Balance;
