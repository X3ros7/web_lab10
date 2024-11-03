import Expenses from "./Expenses.tsx";

export interface IExpense {
    id: string;
    title: string;
    amount: number;
    date: Date;
}

export default Expenses;