import { useState } from 'react'
import authAPI from '../services/authAPI'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom'

function LoginPage({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
          const data = {
            email: formData.email,
            password: formData.password
          }
          
          const result = await authAPI.loginUser(data);
          console.log(result);
          if (result.user) {
            setUser(result.user);
          }
          navigate('/');
        } catch (error) {
          console.error(error.message);
        }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  )
}


export default LoginPage;