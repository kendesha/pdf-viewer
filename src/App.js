import './App.css';
import { AuthContext, AuthContextProvider } from './context/auth-context';
import { Home } from './views/home';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
          <Home/>
      </AuthContextProvider>
    </div>
  );
}

export default App;