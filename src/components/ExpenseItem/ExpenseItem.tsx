import styles from "./ExpenseItem.module.css";
import ExpenseDate from "../ExpenseDate";
import {IExpense} from "../Expenses";
import {db} from "../../firebase";
import {deleteDoc, doc} from "firebase/firestore";
import {SetStateAction} from "react";

interface ExpenseItemProps {
    expense: IExpense;
    setExpenses: (value: SetStateAction<IExpense[]>) => void
}

const ExpenseItem = ({expense, setExpenses}: ExpenseItemProps) => {
    const onDeleteHandler = async (expenseId: string) => {
        try {
            const expensesRef = doc(db, "expenses", expenseId);
            await deleteDoc(expensesRef);
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.expense_item}>
            <ExpenseDate date={expense.date}/>

            <h2>{expense.title}</h2>
            <div className={styles.expense_item__price}>${expense.amount}</div>
            <img src="delete.svg" alt="delete" style={{
                marginLeft: "10px",
                marginRight: "10px",
            }} onClick={() => onDeleteHandler(expense.id)}/>
        </div>
    );
};

export default ExpenseItem;
