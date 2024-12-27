import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Admin = () => {
  const { logout } = useAuth()
  return (
    <div>

      <h1>Admin Page</h1>
      <Link to={'/admin/cart'}>Products</Link>
      <Link to={'/404'}>404</Link>
      <hr />
      <button onClick={() => logout()}>Logout</button>

      {/* Add Admin specific components here */}
      <footer>
        <h2>Admin Footer</h2>
      </footer>
    </div>
  )
}

export default Admin
