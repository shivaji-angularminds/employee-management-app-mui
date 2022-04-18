import { Button } from '@mui/material'
import {Link,Route,useNavigate } from "react-router-dom"

import React from 'react'
import Table from "./Table"
import EmpAdd from './EmpAdd'




function Employees() {
  return (
    <div>
        <Table/>
        <Button> <Link to="/employees/add" >Add new Employees</Link> </Button>
       

    </div>
  )
}

export default Employees