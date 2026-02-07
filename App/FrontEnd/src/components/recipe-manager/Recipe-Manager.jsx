import { useState } from 'react'
import './Recipe-Manager.css'
import profile from './components/recipe-manager/profile/Profile.jsx'
import mainPage from './components/recipe-manager/main-page/Main-Page.jsx'
import save from './components/recipe-manager/save/Save.jsx'

function RecipeManager() {

  return (
    <div>
        <profile></profile>
        <mainPage></mainPage>
        <save></save>
    </div>
  )
}

export default RecipeManager