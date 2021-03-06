import { Button } from "bootstrap";
import { Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import { useState } from "react";
import { useBudgets } from "./contexts/BudgetContext";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";


function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(false)
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
  <>
  <Container className="my-5">
    <Stack direction="horizontal" gap="3" className="mb-4">
      <h2 className="me-auto">Budgets</h2>
      <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
    </Stack>
    <div style={{ 
      display:"grid", 
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
      gap: "1rem", 
      alignItems: "flex-start"
      }}>
        {budgets.map(budget => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          )
          return (
          <BudgetCard 
          key={budget.id}
          name={budget.name}
          amount={amount} 
          max={budget.max}
          onAddExpenseClick={() => openAddExpenseModal(budget.id)}
          />
        )
})}
        <UncategorizedBudgetCard />
      </div>
  </Container>
  <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
  <AddExpenseModal show={showAddExpenseModal} 
  defaultBudgetId={addExpenseModalBudgetId}
  handleClose={() => setShowAddExpenseModal(false)}/>
  </>
  )
}

export default App
