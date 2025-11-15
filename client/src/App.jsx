import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Header from './components/header/header'
import './App.css'


function App() {
  let element = useRoutes([
    {
      path: '/',
      element: <HomePage/>
    },
    {
      path: '/Product',
      element: <ProductPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/signup',
      element: <SignUpPage />
    }
  ])
  
  return (
    <div className='app'>
      <Header/>
      { element }
    </div>
  )
}

export default App
