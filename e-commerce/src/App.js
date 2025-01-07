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
import Cart from './Pages/User/Cart/Cart';
import Shop from './Pages/User/Shop/Shop'
import VendorDashboard from './Pages/Vendor/VendorDashboard';
import GoogleFonts from 'react-google-fonts';
import Contact from './Pages/User/Contact/Contact';
import Checkout from './Pages/User/Checkout/Checkout';
import ShopDetail from './Pages/User/Shop-Detail/ShopDetail';

//ADMIN SIDE CONTENT

import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminOrders from './Pages/Admin/AdminOrders';
import AdminProducts from './Pages/Admin/AdminProducts';
import AdminRevenue from './Pages/Admin/AdminRevenue';
import AdminStats from './Pages/Admin/AdminStats';
import AdminSettings from './Pages/Admin/AdminSettings';
import AdminUsers from './Pages/Admin/AdminUsers';
import AdminVendors from './Pages/Admin/AdminVendors';
import AdminCategory from './Pages/Admin/AdminCategory';


// Vendor Side Files


import VendorOrders from './Pages/Vendor/VendorOrders';
import VendorSales from './Pages/Vendor/VendorSales';
import V_Product_Manage from './Pages/Vendor/V_Product_Manage';
import V_Order_Manage from './Pages/Vendor/V_Order_Manage';
import { UserProvider } from './Context/AdminContext/Management/UserManageContext';
import { VendorProvider } from './Context/AdminContext/Management/VendorManageContext';
import { CategoryProvider } from './Context/AdminContext/CategoryManageContext';
import { ProductProvider } from './Context/AdminContext/Management/ProductsManageContext';
import { VendorProductProvider } from './Context/VendorContext/VendorProductContext';

function App() {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
      <Router>
        <AuthProvider>
          <Layout>
            <ProductProvider>
            <CategoryProvider>
            <VendorProvider>
              <UserProvider>
                <VendorProductProvider>

                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route exact path="/sign-up" element={<SignUp />} />
                  <Route exact path="/404" element={<NotFound />} />
                  <Route path="/" element={<Home />} />

                  {/* Admin Routes */}
                  <Route exact path="/admin" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminDashboard /></RoleBasedRoute>} />
                  <Route exact path="/admin-orders" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminOrders /></RoleBasedRoute>} />
                  <Route exact path="/admin-products" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminProducts /></RoleBasedRoute>} />
                  <Route exact path="/admin-revenue" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminRevenue /></RoleBasedRoute>} />
                  <Route exact path="/admin-stats" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminStats /></RoleBasedRoute>} />
                  <Route exact path="/admin-settings" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminSettings /></RoleBasedRoute>} />
                  <Route exact path="/admin-users" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminUsers /></RoleBasedRoute>} />
                  <Route exact path="/admin-vendors" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminVendors /></RoleBasedRoute>} />
                  <Route exact path="/admin-category" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminCategory /></RoleBasedRoute>} />

                  {/* Vendor Routes */}
                  <Route exact path="/vendor" element={<RoleBasedRoute allowedRoles={["vendor"]}><VendorDashboard /></RoleBasedRoute>} />
                  <Route exact path="/vendor-orders" element={<RoleBasedRoute allowedRoles={["vendor"]}><VendorOrders /></RoleBasedRoute>} />
                  <Route exact path="/vendor-sales" element={<RoleBasedRoute allowedRoles={["vendor"]}><VendorSales /></RoleBasedRoute>} />
                  <Route exact path="/vendor-products" element={<RoleBasedRoute allowedRoles={["vendor"]}><V_Product_Manage /></RoleBasedRoute>} />
                  <Route exact path="/vendor-orders-manage" element={<RoleBasedRoute allowedRoles={["vendor"]}><V_Order_Manage /></RoleBasedRoute>} />


                  {/* User Routes */}

                  <Route path="/" element={<RoleBasedRoute allowedRoles={["user", "vendor"]}><Home /></RoleBasedRoute>} />
                  <Route path="/contact" element={<RoleBasedRoute allowedRoles={["user", "vendor"]}><Contact /></RoleBasedRoute>} />
                  <Route path="/shop" element={<RoleBasedRoute allowedRoles={["user", "vendor"]}><Shop /></RoleBasedRoute>} />
                  <Route path="/shop/cart" element={<RoleBasedRoute allowedRoles={["user"]}><Cart /></RoleBasedRoute>} />
                  <Route path="/shop/checkout" element={<RoleBasedRoute allowedRoles={["user", "vendor"]}><Checkout /></RoleBasedRoute>} />
                  <Route path="/shop/shop-detail" element={<RoleBasedRoute allowedRoles={["user", "vendor"]}><ShopDetail /></RoleBasedRoute>} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
                </VendorProductProvider>
              </UserProvider>
            </VendorProvider>
            </CategoryProvider>
            </ProductProvider>
          </Layout>
        </AuthProvider>

      </Router>


    </>

  );
}

export default App;
