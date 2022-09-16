import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {AuthContext, AuthContextProvider} from './context/auth-context';
import Company from './pages/client/dashboard/companies/companies';
import Login from './pages/login/login';
import {ClientDashboard} from './pages/client/dashboard/client'
import {AdminDashboard} from './pages/admin/dashboard/admin'
import {Users} from './pages/users';
import {CompanyCreate} from './pages/client/dashboard/companies/create';
import Documents from './pages/client/dashboard/documents/documents'
import {UploadDocument} from './pages/client/dashboard/documents/components/upload';
import {Inbox} from './pages/client/dashboard/documents/inbox';

function App() {
    return (
        <div className="App">

            <Router>
                <AuthContextProvider>
                    <Routes>
                        <Route path="/" element={<ClientDashboard/>}>
                            <Route path="companies" element={<Company/>}/>
                            <Route path="companies/create" element={<CompanyCreate/>}/>
                        </Route>

                        <Route path="client" element={<ClientDashboard/>}>
                            <Route path="upload" element={<UploadDocument/>}/>
                            <Route path="inbox" element={<Inbox/>}/>
                            <Route path="companies" element={<Company/>}/>
                            <Route path="companies/create" element={<CompanyCreate/>}/>
                            <Route path="documents" element={<Documents/>}/>
                        </Route>
                        <Route path="Admin" element={<AdminDashboard/>}>

                        </Route>


                        <Route path="companies" element={<Company/>}/>
                        <Route path="companies/create" element={<CompanyCreate/>}/>
                        <Route path="company" element={<Company/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="users" element={<Users/>}/>

                        <Route path="/users" element={<Users/>}/>
                    </Routes>
                </AuthContextProvider>
            </Router>


        </div>
    );
}

export default App;