import React from 'react';
import { useAuth } from '../Context/AuthContext';
import AdminNavbar from '../Components/Navbars/AdminNavbar';
import VendorNavbar from '../Components/Navbars/VendorNavbar';
import UserNavbar from '../Components/Navbars/UserNavbar';
import Footer from '../Components/Footer/Footer';
import AdminFooter from '../Components/Footer/AdminFooter';
const Layout = ({ children }) => {
  const { user } = useAuth(); // Use the user context
  
  // Use a conditional rendering approach outside of JSX
  const headerContent = () => {
    if (user?.role === 'admin') {
      return <AdminNavbar />;
    } else if (user?.role === 'vendor') {
      return <VendorNavbar />;
    } else {
      return <UserNavbar/>
    }
  };

  return (
    <>
      <header>
        {headerContent()} {/* Render the appropriate header */}
      </header>
      {children}
      {/* Footer */}
      {/* {
        user?.role === 'admin' ? <AdminFooter />: <Footer />  // Render the appropriate footer based on user role
      } */}

    </>
  );
};

export default Layout;
