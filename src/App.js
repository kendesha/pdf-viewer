import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthContext, AuthContextProvider } from './context/auth-context';
import Company from './views/client/dashboard/companies/companies';
import Login  from './views/login/login';
import {ClientDashboard} from './views/client/dashboard/client'
import {AdminDashboard} from './views/admin/dashboard/admin'
import { Users } from './views/users';
import { CompanyCreate } from './views/client/dashboard/companies/create';
import Documents from './views/client/dashboard/documents/documents'
import { UploadDocument } from './views/client/dashboard/documents/components/upload';
import { Inbox } from './views/client/dashboard/documents/inbox';

function App() {
  return (
    <div className="App">
     
        <Router>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element ={<ClientDashboard />}>
                <Route path="companies" element ={<Company />}/>
                <Route path="companies/create" element ={<CompanyCreate/>}/>
              </Route>
              
              <Route path="client" element ={<ClientDashboard/>}>
                <Route path="upload" element ={<UploadDocument/>}/>
                <Route path="inbox" element ={<Inbox/>}/>
                <Route path="companies" element ={<Company />}/>
                <Route path="companies/create" element ={<CompanyCreate/>}/>
                <Route path="documents" element ={<Documents/>}/>
              </Route>
              <Route path="Admin" element ={<AdminDashboard/>}>
               
              </Route>
              
              
              <Route path="companies" element ={<Company />}/>
              <Route path="companies/create" element ={<CompanyCreate/>}/>
              <Route path="company" element ={<Company />}/>
              <Route path="login" element ={<Login />}/>
              <Route path="users" element={<Users/>}/>
          
              <Route path="/users" element ={<Users/>}/>
            </Routes>
            </AuthContextProvider>
        </Router>
      
          
      
    </div>
  );
}

export default App;