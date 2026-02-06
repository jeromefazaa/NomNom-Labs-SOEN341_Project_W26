import { useState } from 'react'
import './App.css'
import SignUpForm from './components/signup-form/SignUpForm.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <SignUpForm></SignUpForm>   // recipe manager
    </div>
  )
}

export default App
