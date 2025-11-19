import { useState } from 'react'
import authAPI from '../services/authAPI.js'
import '../styles/login.css'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
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

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }
      
      const result = authAPI.createUser(data);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit" className="login-btn">Sign Up</button>
        </form>
        <p className="signup-link">
          Already have an account? <a href="/login">Log in here</a>
        </p>
      </div>
    </div>
  )
}
