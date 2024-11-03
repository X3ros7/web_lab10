import React from "react";
import styles from "./Hystogram.module.css";
import { IExpense } from "../Expenses";

interface BarChartProps {
  expenses: IExpense[];
}

const BarChart: React.FC<BarChartProps> = ({ expenses }) => {
  const monthlyExpenses = Array(12).fill(0);

  for (const expense of expenses) {
    const expenseMonth = expense.date.getMonth(); // Jan = 0, Feb = 1, ...
    monthlyExpenses[expenseMonth]++;
  }

  const maxExpense = Math.max(...monthlyExpenses);

  return (
    <div className={styles.chart}>
      {monthlyExpenses.map((value, index) => {
        const barFillHeight =
          maxExpense > 0 ? `${(value / maxExpense) * 100}px` : "0%";

        return (
          <div key={index} className={styles.chart_bar}>
            <div className={styles.chart_bar__inner}>
              <div
                className={styles.chart_bar__fill}
                style={{ height: barFillHeight }}
              ></div>
            </div>
            <div className={styles.chart_bar__label}>
              {new Date(0, index).toLocaleString("en-US", { month: "short" })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
