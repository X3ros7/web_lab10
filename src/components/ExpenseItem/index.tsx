import React from "react";
import styles from "./ExpenseItem.module.css";
import ExpenseDate from "../ExpenseDate";
import { Expense } from "../Expenses";

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  return (
    <div className={styles.expense_item}>
      <ExpenseDate date={expense.date} />

      <h2>{expense.title}</h2>
      <div className={styles.expense_item__price}>${expense.amount}</div>
    </div>
  );
};

export default ExpenseItem;
