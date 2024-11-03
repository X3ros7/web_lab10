import {FC, useEffect, useState} from "react";
import Expenses, {IExpense} from "../Expenses";
import styles from "./Card.module.css";
import ExpenseForm from "../ExpenseForm";
import Histogram from "../Histogram";
import Filter from "../Filter";
import {collection, getDocs} from "firebase/firestore";
import {firestore_db} from "@/firebase";
import Loader from "../Loader";

const Card: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [selectedYear, setSelectedYear] = useState("2021");
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const itemsCollection = collection(firestore_db, "expenses");
                const itemsSnapshot = await getDocs(itemsCollection);
                const itemDocs = itemsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                    amount: doc.data().amount,
                    date: new Date(doc.data().date.seconds * 1000),
                }))
                setExpenses(itemDocs);
            } catch (e) {
                console.error(`Error while fetching items: ${e}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems()
    }, []);

    const addExpenseHandler = (expense: IExpense) =>
        setExpenses((prevExpenses) => [...prevExpenses, expense]);

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const filteredExpenses = expenses.filter(
        (expense) => expense.date.getFullYear().toString() === selectedYear
    );

    return (
        <div className={styles.card}>
            {!isFormVisible ? (
                <div className={styles.button_container}>
                    <button onClick={toggleForm} className={styles.toggle_button}>
                        Add expense
                    </button>
                </div>
            ) : (
                <ExpenseForm onAddExpense={addExpenseHandler} onCancel={toggleForm} setIsLoading={setIsLoading}/>
            )}
            <Filter onYearChange={setSelectedYear} selectedYear={selectedYear}/>
            <Histogram expenses={filteredExpenses}/>
            {isLoading ? (
                <Loader/>
            ) : ''}
            <Expenses expenses={filteredExpenses} setExpenses={setExpenses}/>
        </div>
    );
};

export default Card;
