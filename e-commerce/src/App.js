import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import { AuthProvider } from './Context/AuthContext';
import NotFound from './Components/NotFound';
import SignUp from './Auth/SignUp';
import Layout from './Layouts/Layout';

// Home component
import Home from './Pages/Home/Home';
import RoleBasedRoute from './Auth/ProtectedRoute';
import Cart from './Pages/Cart';

import AdminDashboard from './Pages/AdminDashboard';
import VendorDashboard from './Pages/VendorDashboard';
import GoogleFonts from 'react-google-fonts';
import Contact from './Pages/Contact/Contact';
function App() {
  return (
    <>
    <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
      <Router>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route exact path="/sign-up" element={<SignUp />} />
              <Route exact path="/404" element={<NotFound />} />
              <Route path="/" element={<Home />} />

              {/* Admin Routes */}
              <Route exact path="/admin" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminDashboard /></RoleBasedRoute>} />
              <Route exact path="/admin/cart" element={<RoleBasedRoute allowedRoles={["admin"]}><Cart /></RoleBasedRoute>} />

              {/* Vendor Routes */}
              <Route exact path="/vendor" element={<RoleBasedRoute allowedRoles={["vendor"]}><VendorDashboard /></RoleBasedRoute>} />
              

              {/* User Routes */}

              <Route path="/" element={<RoleBasedRoute allowedRoles={["user"]}><Home /></RoleBasedRoute>} />
              <Route path="contact/" element={<RoleBasedRoute allowedRoles={["user"]}><Contact /></RoleBasedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>

      </Router>


    </>

  );
}

export default App;
