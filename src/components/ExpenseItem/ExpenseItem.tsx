import {FC, SetStateAction} from "react";
import {deleteDoc, doc} from "firebase/firestore";
import {firestore_db} from "@/firebase";
import styles from "./ExpenseItem.module.css";
import ExpenseDate from "../ExpenseDate";
import {IExpense} from "../Expenses";
import UpdateDialog from "../UpdateDialog";

interface ExpenseItemProps {
    expense: IExpense;
    setExpenses: (value: SetStateAction<IExpense[]>) => void;
}

const ExpenseItem: FC<ExpenseItemProps> = ({expense, setExpenses}) => {
    const onDeleteHandler = async (expenseId: string) => {
        try {
            const expensesRef = doc(firestore_db, "expenses", expenseId);
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
            <UpdateDialog expense={expense} setExpenses={setExpenses}/>
            <img src="delete.svg" alt="delete" className="m-3 bg-purple-950 p-1.5 border rounded"
                 onClick={() => onDeleteHandler(expense.id)}/>
        </div>
    );
};

export default ExpenseItem;
