

import ManageProfileButton from './profile-management/ManageProfileButton.jsx'
import { useState } from "react";
import { useDispatch } from "react-redux";
import ManageProfile from './profile-management/ManageProfile.jsx';
import { logout } from '../../../../redux/slices/appStateSlice.js';
import { setCurrentUser } from '../../../../redux/slices/currentUserSlice.js';
import { setRecipes } from '../../../../redux/slices/recipesSlice.js';


function UserManagement({ onLogout, isLoggedIn }) {
    const dispatch = useDispatch();

    const [myProfileOpen, setMyProfileOpen] = useState(false);

    function handleMyProfileClick() {
        setMyProfileOpen(true);
    }

    function handleMyProfileClose() {
        setMyProfileOpen(false);
    }

    function handleLogout(e) {
        console.log(`logout button clicked`)
        e?.preventDefault();
        dispatch(setCurrentUser({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            allergies: [],
            dietaryPreferences: [],
            isLoading: false,
            hasErrors: false,
        }));
        dispatch(setRecipes([]))
        dispatch(logout());

        if (onLogout) {
            console.log(`closing popup`)
            onLogout(); //closes popup
        }
    }

    return (
        <div className="auth">
            <div className="user-actions">
                <button type="button" className="btn btn-secondary" onClick={handleLogout}>
                    Logout
                </button>

                <button type="button" className="btn btn-primary" onClick={handleMyProfileClick}>
                    My Profile
                </button>

                <ManageProfile open={myProfileOpen} onClose={handleMyProfileClose}></ManageProfile>
            </div>
        </div>

    )
}

export default UserManagement
