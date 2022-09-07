import {  useState,Component} from "react";
import { DropzoneArea } from "material-ui-dropzone";
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import {FormControl,FormLabel,FormControlLabel,Radio } from '@mui/material';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";

class Documents extends Component{
    constructor(props){
      super(props);
      this.state = {
        files: [],
        progess: 0
      };
      
    }
    S3_BUCKET ='tw-digital-invoice-dev';
    REGION ='US East (Ohio) us-east-2';

 
    handleChange = async(file) =>{
    console.log(file[0]);
      this.setState({
        files: file[0]
      });
     
    }
    uploadFile = async () =>{
        console.log(this.state.files)
        const params = {
            Body: this.state.files,
            Bucket: this.S3_BUCKET,
            Key: this.state.files.name
        };
        try {
            const parallelUploads3 = new Upload({
              client: new S3Client({
               region: this.REGION
                // credentials: { creds },
              }),
      
              leavePartsOnError: false, // optional manually handle dropped parts
              params: params,
            });
      
            parallelUploads3.on("httpUploadProgress", (progress) => {
              console.log(progress);
            });
      
            parallelUploads3.done();
            this.setState({progress: 100})
          } catch (e) {
            console.log("error", e.message);
          }
    }
    render(){
      return (
            <div>
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Agreement Type</FormLabel>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                    <FormControlLabel value="1" control={<Radio />} label="Simple" />
                    <FormControlLabel value="2" control={<Radio />} label="Legal" />
                </RadioGroup>
                </FormControl>  
                <DropzoneArea
                    onChange={this.handleChange.bind(this)}
                    acceptedFiles={['application/pdf']}  
                    filesLimit = {1}/>
                    <Button
                        fullWidth
                        style= {{backgroundColor: "#EB5F40"}}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={this.uploadFile.bind(this)}>
                    upload
                </Button>
            </div>
      )
    }
  }
  

// function Documents(){
//     const [file,setFile] = useState([]);
//     const [progress , setProgress] = useState(0);

//     const handleChange = (e) =>{
//         console.log('in this function');
//         setFile(e.target.files[0]);
//         console.log(file);
//      }
//     return(
//         <div>
//        <FormControl>
//         <FormLabel id="demo-radio-buttons-group-label">Agreement Type</FormLabel>
//         <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
//             <FormControlLabel value="1" control={<Radio />} label="Simple" />
//             <FormControlLabel value="2" control={<Radio />} label="Legal" />
//         </RadioGroup>
//         </FormControl>               
//         <DropzoneArea 
//             onChange={()=>handleChange} 
//             filesLimit = {1}   
//             acceptedFiles={['application/pdf']}  
//             previewText="Selected files"/>
//         </div>
//     )
// }
export default Documents;