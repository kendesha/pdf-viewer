import {  useState,useContext} from "react";
import { DropzoneArea } from "material-ui-dropzone";
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import {FormControl,FormLabel,FormControlLabel,Radio } from '@mui/material';
import axios from 'axios'
import { AuthContext } from "../../../../../context/auth-context";

export const UploadDocument = () => {
    const [files,setFiles] = useState([]);
    const [progress,setProgress] = useState(0);
    const authContext = useContext(AuthContext)
    const token =  authContext.token;

    const handleChange = async (file) =>{
        console.log(file[0]);
         setFiles({
            files: file[0]
          });
         
        }
    const config = {
            headers: { Authorization: `Bearer ${token}`, 'content-type': 'multipart/form-data' }
    };
    const uploadFile = async () =>{
        axios.post('http://192.168.4.20/api/Documents/upload-document',{file: files.files},config)
        .then(response => {
            console.log(response);
        })
        .catch(error => {console.log(error)})
        }
    return (
        <div>
            {/* <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Agreement Type</FormLabel>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                <FormControlLabel value="1" control={<Radio />} label="Simple" />
                <FormControlLabel value="2" control={<Radio />} label="Legal" />
            </RadioGroup>
            </FormControl>   */}
            <DropzoneArea
                onChange={handleChange}
                acceptedFiles={['application/pdf']}  
                filesLimit = {1}/>
                <Button
                    fullWidth
                    style= {{backgroundColor: "#EB5F40"}}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    //onClick={uploadFile}
                    >
                upload
            </Button>
          
        </div>
  )
}
