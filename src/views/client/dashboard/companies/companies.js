import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/auth-context";
import axios from 'axios'
import { Box,Modal, TableContainer,Table, TableBody, TableCell, TableHead, TableRow,Paper } from "@mui/material";
import Button from '@mui/material/Button';
import CreateCompany from './modals/createCompany'
import UpdateCompany from './modals/updateCompany'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Company(){

  
    const authContext = useContext(AuthContext)
    const token =  authContext.token;
    const [companies, setCompanies] = useState([]);
    const [open,setOpen] = useState(false)
    const [modalType, setModalType] = useState('');
    const [currentData, setCurrentData] = useState({});
 
    function createCompany(){
      setModalType('create');
      setOpen(true);
    }
    function editCompany(id){
      setModalType('edit');
      getCompanyById(id);
      setOpen(true);
    }
    function deactivateCompany(id){

    }
    function getCompanyById(id){
      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.get('https://localhost:44375/api/Companies/get-companies-by-id?id='+ id,config)
         .then(response => {
          if(response.data.succeeded){
            let companyInfo = response.data.data[0];
            setCurrentData( currentValues => ({
                    ...currentValues,
                    ...companyInfo
                }))
         }})
         .catch(error => {console.log(error)})
    }

    const getCompanies = async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        return axios.get('https://localhost:44375/api/Companies/get-companies',config)
    }

    const fetchCompanies = async () => {
      const data =  await getCompanies()

      if (data.status == 200) {
        setCompanies(data.data.data)
      }
    
    }

    useEffect(() => {
         fetchCompanies();
    }, [])

    function closeModal(){
      fetchCompanies();
    }
    return (
       <div>
        <Button variant="contained" onClick={() => createCompany()}> 
           Add Company
        </Button>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">Tax Number</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal
        open={open}
        onClose={closeModal}
        style={{ display:'flex' ,alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={{width: 400 }}>
        {modalType == 'create' && <CreateCompany handleClose={setOpen} />}
        {modalType == 'edit' && <UpdateCompany handleClose={setOpen} currentData= {currentData}/>}
       
      </Box>
    </Modal>
  
       </div>
    )
}
