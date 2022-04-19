import { Button } from 'bootstrap'
import React from 'react'
import { Card, ProgressBar, Stack } from 'react-bootstrap'
import { currencyFormatter } from './Utility'
import getProgressBarVariant from './ProgressBarVariant'

export default function BudgetCard( {name, amount, max, gray, onAddExpenseClick} ) {
    const className = []
    if (amount > max) {
        className.push("bg-danger", "bg-opacity-10")
    } else if (gray) {
        className.push("bg-light")
    }

  return (
      <Card className={ className.join(" ")}>
          <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-baseline">
                <div className='me-2'>{name}</div>
                <div>{currencyFormatter.format(amount)} / {currencyFormatter.format(max)}</div>
            </Card.Title>
            <ProgressBar 
            className='rounded-pill' 
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            current={amount} />
            <Stack direction='horizontal' gap="2" className='mt-4'>
                <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>Add Expense</Button>
                <Button variant="outline-secondary">View Expense</Button>
            </Stack>
          </Card.Body>
      </Card>
  )
}

