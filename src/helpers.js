const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;

  return `${existingBudgetLength * 34} 65% 50%`
};

// fake a delay to demo disabled button styles
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800))

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key) ?? [];
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
}

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];

  return data.filter((item) => item[key] == value);
}

// create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount, // passed in as string and convert it to a number with + symbol
    color: generateRandomColor(),
  }

  const existingBudgets = fetchData("budgets") ?? [];

  return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
};

// create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount, // passed in as string and convert it to a number with + symbol
    budgetId: budgetId,
  }

  const existingExpenses = fetchData("expenses") ?? [];

  return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
};

// Total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to total
    return acc += expense.amount
  }, 0);

  return budgetSpent;
};

// Formatting

// Format percentages
export const formatPercentage = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
}

// Format currency
export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "GBP",
  });
};

// Format Date
export const formatDateToLocaleString = (epoch) => (
  new Date(epoch).toLocaleDateString()
);