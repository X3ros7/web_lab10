import ExpenseItem from "../ExpenseItem";
import styles from "./Expenses.module.css";
import {IExpense} from "./";
import {SetStateAction} from "react";

interface ExpensesProps {
    expenses: IExpense[];
    setExpenses: (value: SetStateAction<IExpense[]>) => void;
}

const Expenses = ({expenses, setExpenses}: ExpensesProps) => {
    return (
        <div className={styles.expenses}>
            {expenses.map((expense) => (
                <div className="expense_item" key={expense.id}>
                    <ExpenseItem expense={expense} setExpenses={setExpenses}/>
                </div>
            ))}
        </div>
    );
};

export default Expenses;
