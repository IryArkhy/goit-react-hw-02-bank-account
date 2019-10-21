import React from 'react';
import T from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => {
  const totalIncome = income();
  const totalExpences = expenses();
  return (
    <section className={styles.balance}>
      <span>&#8593; </span>
      <span>{totalIncome}$</span>
      <span>&#8595; </span>
      <span>{totalExpences}$</span>
      <span>Balance: {balance}$</span>
    </section>
  );
};

Balance.propTypes = {
  balance: T.number.isRequired,
  income: T.func.isRequired,
  expenses: T.func.isRequired,
};

export default Balance;
