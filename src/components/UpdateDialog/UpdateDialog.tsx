import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {IExpense} from "@/components/Expenses";
import {FC, SetStateAction, useState} from "react";
import {useForm} from "react-hook-form";
import {doc, updateDoc} from "firebase/firestore";
import {firestore_db} from "@/firebase";
import {Loader2, Pencil, Save} from "lucide-react";

interface UpdateDialogProps {
    setExpenses: (value: SetStateAction<IExpense[]>) => void;
    expense: IExpense;
}

const UpdateDialog: FC<UpdateDialogProps> = ({setExpenses, expense}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<IExpense>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: { title: string, amount: number }) => {
        try {
            setIsLoading(true);
            const expenseRef = doc(firestore_db, "expenses", expense.id);
            await updateDoc(expenseRef, {...data});
            setExpenses((prevExpenses) => prevExpenses.map(prevExpense =>
                prevExpense.id === expense.id ? {
                    id: expense.id,
                    date: prevExpense.date,
                    amount: data.amount,
                    title: data.title
                } : prevExpense));
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger
                className="inline-flex ml-2.5 items-center gap-1 px-3 py-1.5 text-white font-bold bg-purple-950 border hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors duration-200">
                <Pencil className="w-4 h-4"/>
                <span>Edit</span>
            </DialogTrigger>

            <DialogContent
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 max-w-md w-full mx-auto shadow-xl border border-gray-200">
                <DialogHeader className="mb-6">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-gray-800">
                            Update expense
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter expense title"
                            type="text"
                            defaultValue={expense.title}
                            {...register("title", {
                                required: "Title is required",
                                minLength: {
                                    value: 3,
                                    message: "Title must be at least 3 characters"
                                }
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input
                                className="w-full p-2.5 pl-7 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                                placeholder="0.00"
                                type="number"
                                step="0.01"
                                defaultValue={expense.amount}
                                {...register("amount", {
                                    required: "Amount is required",
                                    min: {
                                        value: 0.01,
                                        message: "Amount must be greater than 0"
                                    }
                                })}
                            />
                        </div>
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                        )}
                    </div>

                    <DialogClose asChild>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full inline-flex items-center justify-center gap-2 bg-purple-950 text-white py-2.5 px-4 rounded-lg hover:bg-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin"/>
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5"/>
                                    <span>Update</span>
                                </>
                            )}
                        </button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateDialog;