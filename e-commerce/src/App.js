import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Auth/Login';
import { AuthProvider } from './Context/AuthContext';

import SignUp from './Auth/SignUp';
function App() {
  return (
    <>
    <Router>
    <AuthProvider>

      <Routes>
        <Route  path="/login" element={<Login />} />
        <Route exact path="/sign-up" element={<SignUp />} />
      </Routes>
      </AuthProvider>
    </Router>
    
    </>
   
  );
}

export default App;
