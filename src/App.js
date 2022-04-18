import React from 'react'
import Employees from './components/Employees'
import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import Form from './components/Form'
import EmpAdd from './components/EmpAdd'
import EmployeesUpdate from './components/EmployeesUpdate'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to="/employees" replace />} />
    <Route path="/employees" element={<Employees/>} />

      <Route path="/employees/add" element={<EmpAdd />} />
      <Route path="/employees/update/*" element={<EmployeesUpdate />} />


    </Routes>
    </BrowserRouter>
  )
}

export default App