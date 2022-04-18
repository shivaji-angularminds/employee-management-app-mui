import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Employees from "./Employees";
import { NewReleases } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));






export default function CustomizedTables() {
  const navigate = useNavigate();

    let array1=JSON.parse(localStorage.getItem("dataArray"))
    const [array,setArray]=React.useState(array1 ? array1:[])

    

    if(!array){
        return(
            <Typography varient="h3">Data is Not Available</Typography>
        )
    }

    function handleDeleteClick(index){
 console.log(index)
        let array3=[...array]
        let array2 = array3.filter((prev) => {
            return prev.name !== array[index].name;
          });
          localStorage.setItem("dataArray",JSON.stringify(array2))
        setArray([...array2])

    }

    console.log(array)

  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {array.map((row,index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="Employees">
              <Avatar  >{ row.name && row.name.split(' ')[0][0]}{row.name.split(' ')[1][0]}</Avatar>
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.mobileNo}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton aria-label="delete" size="large">
                  <EditIcon fontSize="inherit" onClick={()=>{
                  navigate(`/employees/update/${index}`, { state: { index:index } });

                }}  />                </IconButton>
                <IconButton aria-label="delete" size="large">
                <DeleteIcon onClick={()=>{
                    console.log("fdhvw")
                    handleDeleteClick(index)
                }} fontSize="inherit" />
              </IconButton>
              </StyledTableCell>{" "}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
