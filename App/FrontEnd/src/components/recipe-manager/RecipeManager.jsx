import { useState } from 'react'
import './RecipeManager.css'
import Profile from './profile/Profile.jsx'
import MainPage from './main-page/MainPage.jsx'
import SaveButton from './save/SaveButton.jsx'
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function RecipeManager() {
  const [profileOpen, setProfileOpen] = useState(false);

  function handleProfileClick() {
    setProfileOpen(true);
  }

  function handleProfileClose() {
    setProfileOpen(false);
  }

  return (
    <div>
      <IconButton onClick={handleProfileClick} color="primary">
        <AccountCircleIcon />
      </IconButton>
      <MainPage></MainPage>
      <SaveButton></SaveButton>
      <Profile open={profileOpen} onClose={handleProfileClose} />
    </div>
  )
}

export default RecipeManager