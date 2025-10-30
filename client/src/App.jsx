import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/header/header'
import './App.css'

function App() {
  let element = useRoutes([
    {
      path: '/',
      element: <HomePage/>
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
