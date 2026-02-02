import { useState } from 'react'
import './App.css'
import LoginForm from './components/login-form/LoginForm.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <LoginForm></LoginForm>   
    </div>
  )
}

export default App
