import {useEffect, useState} from "react";
import Expenses, {IExpense} from "../Expenses";
import styles from "./Card.module.css";
import ExpenseForm from "../ExpenseForm";
import Hystogram from "../Hystogram";
import Filter from "../Filter";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import Loader from "../Loader";

const Card = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [selectedYear, setSelectedYear] = useState("2021");
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const itemsCollection = collection(db, "expenses");
                const itemsSnapshot = await getDocs(itemsCollection);
                const itemDocs = itemsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                    amount: doc.data().amount,
                    date: new Date(doc.data().date.seconds * 1000),
                }))
                setExpenses(itemDocs);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
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
                <ExpenseForm onAddExpense={addExpenseHandler} onCancel={togleForm} setIsLoading={setIsLoading}/>
            )}
            <Filter onYearChange={setSelectedYear} selectedYear={selectedYear}/>
            <Hystogram expenses={filteredExpenses}/>
            {isLoading ? (
                <Loader/>
            ) : ''}
            <Expenses expenses={filteredExpenses} setExpenses={setExpenses}/>
        </div>
    );
};

export default Card;
