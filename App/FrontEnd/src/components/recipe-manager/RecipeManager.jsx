import './RecipeManager.css'
import Profile from './profile/Profile.jsx'
import MainPage from './main-page/MainPage.jsx'
import SaveButton from './save/SaveButton.jsx'
function RecipeManager() {

  return (
    <div>
        <Profile></Profile>
        <MainPage></MainPage>
        <SaveButton></SaveButton>
    </div>
  )
}

export default RecipeManager