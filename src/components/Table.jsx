import ExpenseItem from "./ExpenseItem";

const Table = ({ expenses, showBudget = true }) => {

  let tableHeaders = ["Name", "Amount", "Date", ""];

  // control whether to include "Budget in the list of <th>"
  if(showBudget) {
    tableHeaders.splice(3, 0, "Budget");
  }

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {
              tableHeaders.map((item, index) => (
                <th key={index}>{item}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={expense.id}>
                <ExpenseItem expense={expense} showBudget={showBudget} />
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table;