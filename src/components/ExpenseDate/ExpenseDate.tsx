import styles from "./ExpenseDate.module.css";
import {FC} from "react";

interface ExpenseDateProps {
    date: Date
}

const ExpenseDate: FC<ExpenseDateProps> = ({date}) => {
    return (
        <div className={styles.expense_date}>
            <div className={styles.expense_date__month}>
                {date.toLocaleString("en", {month: "long"})}
            </div>
            <div className={styles.expense_date__year}>{date.getUTCFullYear()}</div>
            <div className={styles.expense_date__day}>{date.getDate()}</div>
        </div>
    );
};

export default ExpenseDate;
