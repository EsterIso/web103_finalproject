import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Header from './components/header/header'
import './App.css'


function App() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

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
      element: <LoginPage setUser={setUser} />
    },
    {
      path: '/signup',
      element: <SignUpPage />
    }
  ])
  
  return (
    <div className='app'>
      <Header user={user} setUser={setUser} />
      { element }
    </div>
  )
}

export default App
