import React from 'react'
import { useAuth } from '../../Context/AuthContext'

import Features from './Features'
import Carousel from './Carousel'
import Category from './Category'
import Products from './Products'
import Offer from './Offer'
const Home = () => {
  const { logout } = useAuth()
  return (
    <>
      <Carousel />
      <Features />
      <Category/>
      <Products/><hr />
      <Offer/>

    </>

  )
}

export default Home
