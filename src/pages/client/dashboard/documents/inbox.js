import {Box, Modal, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper} from "@mui/material";
import {useState} from "react";

export const Inbox = () => {

    const [documents, setDocuments] = useState([]);


    return <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">ID</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/* {companies.map((company) => (
          <TableRow
            key={company.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {company.id}
            </TableCell>
            <TableCell align="right">{company.name}</TableCell>
            <TableCell align="right">{company.tax_id}</TableCell>
          
            <TableCell align="right"><EditIcon onClick={()=>editCompany(company.id)}/><DeleteIcon/></TableCell>
          </TableRow>
        ))} */}
            </TableBody>
        </Table>
    </TableContainer>
}