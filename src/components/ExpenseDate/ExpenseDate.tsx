import styles from "./ExpenseDate.module.css";

interface ExpenseDateProps {
    date: Date
}

const ExpenseDate = ({ date }: ExpenseDateProps) => {
    return (
        <div className={styles.expense_date}>
            <div className={styles.expense_date__month}>
                {date.toLocaleString("en", { month: "long" })}
            </div>
            <div className={styles.expense_date__year}>{date.getUTCFullYear()}</div>
            <div className={styles.expense_date__day}>{date.getDate()}</div>
        </div>
    );
};

export default ExpenseDate;
