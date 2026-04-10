import { useState } from "react";
import Profile from "./profile/Profile.jsx";
import MainPage from "./main-page/MainPage.jsx";
import SaveButton from "./save/SaveButton.jsx";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle.js";

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
      <div className="brand-header">
        <IconButton
          onClick={handleProfileClick}
          color="primary"
          className="profile-icon"
        >
          <AccountCircleIcon />
        </IconButton>

        <div className="meal-major-logo">Meal Major</div>
      </div>

      <MainPage />
      <SaveButton />
      <Profile open={profileOpen} onClose={handleProfileClose} />
    </div>
  );
}

export default RecipeManager;