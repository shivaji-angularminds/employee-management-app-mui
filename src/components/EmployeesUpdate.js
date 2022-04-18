import React from 'react'
import { useLocation } from 'react-router-dom';
import Form3 from './Form3'
import Table from "./Table"

function EmployeesUpdate() {
    const {state} = useLocation();

  return (
    <div>
        <Form3 index={state.index} />
    </div>
  )
}

export default EmployeesUpdate