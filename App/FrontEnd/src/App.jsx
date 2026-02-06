import { useState } from 'react'
import './App.css'
import SignUpForm from './components/signup-form/SignUpForm.jsx';
import recipeManager from './components/recipe-manager/RecipeManager.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <recipeManager></recipeManager>
    </div>
  )
}

export default App
