import React from 'react'
import { useLocation } from 'react-router-dom';
import Form2 from './Form2'
import Table from "./Table"

function EmployeesUpdate() {
    const {state} = useLocation();

  return (
    <div>
        <Form2 index={state.index} />
    </div>
  )
}

export default EmployeesUpdate