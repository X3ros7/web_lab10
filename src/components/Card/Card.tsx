import {useEffect, useState} from "react";
import Expenses, {IExpense} from "../Expenses";
import styles from "./Card.module.css";
import ExpenseForm from "../ExpenseForm";
import Hystogram from "../Hystogram";
import Filter from "../Filter";
import {collection, getDocs} from "firebase/firestore";
import { db } from "../../firebase";

const Card = () => {
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [selectedYear, setSelectedYear] = useState("2021");
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            const itemsCollection = collection(db, "expenses");
            const itemsSnapshot = await getDocs(itemsCollection);
            const itemDocs =  itemsSnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                amount: doc.data().amount,
                date: new Date(doc.data().date.seconds * 1000),
            }))
            setExpenses(itemDocs);
        };

        fetchItems()
    }, []);

    const addExpenseHandler = (expense: IExpense) =>
        setExpenses((prevExpenses) => [...prevExpenses, expense]);

    const togleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const filteredExpenses = expenses.filter(
        (expense) => expense.date.getFullYear().toString() === selectedYear
    );

    return (
        <div className={styles.card}>
            {!isFormVisible ? (
                <div className={styles.button_container}>
                    <button onClick={togleForm} className={styles.toggle_button}>
                        Add expense
                    </button>
                </div>
            ) : (
                <ExpenseForm onAddExpense={addExpenseHandler} onCancel={togleForm} />
            )}
            <Filter onYearChange={setSelectedYear} selectedYear={selectedYear} />
            <Hystogram expenses={filteredExpenses} />
            <Expenses expenses={filteredExpenses} setExpenses={setExpenses} />
        </div>
    );
};

export default Card;
