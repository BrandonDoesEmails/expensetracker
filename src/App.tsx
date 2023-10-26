import { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const categories = ["Groceries", "Utilities", "Entertainment"] as const;

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Rent", amount: 350, category: "Utilities" },
    { id: 2, description: "TF", amount: 500, category: "Entertainment" },
    { id: 3, description: "Electricity", amount: 100, category: "Utilities" },
    { id: 4, description: "Grab", amount: 300, category: "Groceries" },
  ]);

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <div className="App">
      <ExpenseForm
        onSubmit={(expense) =>
          setExpenses([
            ...expenses,
            {
              ...expense,
              amount: Number(expense.amount),
              id: expenses.length + 1,
            },
          ])
        }
      />
      <ExpenseFilter onSelectCategory={handleCategory} />
      <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
    </div>
  );
};

export default App;
