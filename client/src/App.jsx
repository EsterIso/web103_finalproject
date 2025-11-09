import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
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
