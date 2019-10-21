import React from 'react';
import T from 'prop-types';
import styles from './Transactions.module.css';

const Transactions = ({ items }) => {
  return (
    <>
      {items.length > 0 && (
        <table className={styles.history}>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.amount}$</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
Transactions.defaultProps = {
  items: [
    {
      id: 'default',
      type: 'No transactions yet',
      amount: '0',
      date: '-',
    },
  ],
};

Transactions.propTypes = {
  items: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      type: T.string.isRequired,
      amount: T.number.isRequired,
      date: T.string.isRequired,
    }).isRequired,
  ),
};

export default Transactions;
