import React from 'react'
import { useAuth } from '../../Context/AuthContext'

import Features from './Features'
import Carousel from './Carousel'
import Category from './Category'
const Home = () => {
  const { logout } = useAuth()
  return (
    <>
      <Carousel />
      <Features />
      <Category/>

    </>

  )
}

export default Home
