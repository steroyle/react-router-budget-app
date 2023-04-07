const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;

  return `${existingBudgetLength * 34} 65% 50%`
};

// fake a delay to demo disabled button styles
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 1500))

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

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

// delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};