import {  useState,useContext,useEffect} from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import {Box,FormControl,Select,InputLabel,MenuItem,Radio,FormControlLabel,RadioGroup,FormLabel,TextField,Typography } from '@mui/material';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { AuthContext } from "../../../../../context/auth-context";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  

export const UploadDocument = () => {
    const [files,setFiles] = useState([]);
    const [companies,setCompanies] = useState([]);
    const [companyId,setCompanyId] = useState('');
    const [agreementType,setAgreementType] = useState('');
    const [validity,setValidity] = useState('');
    const [signatures,setSignatures] = useState([]);
    const [names,setNames] = useState([]);
    const [disabled,setDisabled] = useState(true);
    const [documentData,setDocumentData] = useState({
        Document:{
            company_id: null,
            agreement_type: null,
            file:null,
            validity: null
        }
    });
    const [index, setIndex] = useState(2);
    const [signatureList, setSignatureList] = useState([
      { 
       id : '',
       name: '',
       index: 1,
       email: ''
      },
      { 
      id : '',
      name: '',
      index: 2,
      email: ''
     },
    ])
    const authContext = useContext(AuthContext)
    const token =  authContext.token;
    const theme = useTheme();
    
    const handleChange = async (file) =>{
        console.log(file[0]);
         setFiles({
            files: file[0]
          });
         
    }
    const handleChanges = (e) =>{
     
        const { name, value } = e.target;
    
        switch(name){
            case "company_id":
                setCompanyId(value);
            
            break;
            case "agreement_type":
                setAgreementType(value);
           break;
             case "validity":
                setValidity(value);
            break;
            default:
        }
     
        
    }
    useEffect(() => {
        getCompanies();
      
    }, []);
    useEffect(() => {
          setDocumentData((prevData)=>({
            Document:{
                ...prevData.Document,
                company_id: companyId
            }
          }));
          getSignatures();
      
    }, [companyId]);
      useEffect(() => {
          setDocumentData((prevData)=>({
            Document:{
                ...prevData.Document,
                agreement_type: agreementType
                
            }
          }));
      
    }, [agreementType]);
    useEffect(() => {
        setDocumentData((prevData)=>({
          Document:{
            ...prevData.Document,
            validity: validity
              
          }
        }));
    
    }, [validity]);
    useEffect(() => {
        setDocumentData((prevData)=>({
        Document:{
            ...prevData.Document,
            file: files
            
        }
        }));

    }, [files]);
    const config = {
            headers: { Authorization: `Bearer ${token}`, 'content-type': 'multipart/form-data' }
    };
    const getCompanies = () =>{
        axios.get('http://192.168.4.20/api/company',config)
        .then(response => {
            var data = response?.data?.data;
            setCompanies(data);
        })
        .catch(error => {console.log(error)})
        
    }
    const getSignatures = () => {
    
        if(companyId != ""){
          axios.get('http://192.168.4.20/api/signatures/companies/'+ companyId,config)
            .then(response => {
                var data = response?.data?.data;
                setSignatures(data);
            })
            .catch(error => {console.log(error)})
        
        }
    }
    const signatureChange = (event) => {
        const {
          target: { value },
        } = event;
        setNames((prevData) => ({
          ...prevData,
          value
        }));
      };
    const uploadFile = async () =>{
        axios.post('http://192.168.4.20/api/Documents/upload-document',{file: files.files},config)
        .then(response => {
            console.log(response);
        })
        .catch(error => {console.log(error)})
    }

    return (
      <Box spacing={5} sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          padding: '50px',
          background: 'white',
          borderRadius: '4px',
          m: 1}}>
        <FormControl sx={{ width: 1/4 }}>
            <InputLabel id="select-company-label">Company</InputLabel>
            <Select
                labelId="select-company-label"
                id="company"
                defaultValue="" 
                name="company_id"
                onChange={handleChanges}
            >
                {companies.map((company) =>
                    {
                    if(company.is_active)
                      { return(
                        <MenuItem key={company.id.toString()} value={company.id}>{company.name}</MenuItem>
                       )}
                    }
                )}
                                
            </Select>
        </FormControl>
        <FormControl>
            <FormLabel id="agreement-buttons-group-label">Agreement Type</FormLabel>
            <RadioGroup
                row
                aria-labelledby="agreement-buttons-group-label"
                defaultValue="1"
                name="agreement_type"
                onChange={handleChanges}
            >
                <FormControlLabel value="1" control={<Radio />} label="Simple Agreement" />
                <FormControlLabel value="2" control={<Radio />} label="Legal Agreement" />
            </RadioGroup>
        </FormControl>

        <FormControl>
        <TextField
            id="validity"
            label="validity"
            type="date"
            name = "validity"
            onChange={handleChanges}
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            InputLabelProps={{
            shrink: true,
            }}
        />
        </FormControl>
        <Box>
        {
        signatureList.map((signature)=> {
         return <Box key={signature.index}>
            <Typography variant="h6">
               Signature {signature.index}
            </Typography>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />     
             </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" />     
             </Form.Group>
          </Box>

        }) 
       }
       </Box>
      <FormControl fullWidth>
        <DropzoneArea
                    onChange={handleChange}
                    acceptedFiles={['application/pdf']}  
                    filesLimit = {1}/>
        </FormControl>
                <Button
                    fullWidth
                    style= {{backgroundColor: "#EB5F40"}}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={uploadFile}>
                upload
            </Button>
        </Box>
    
  )
}
