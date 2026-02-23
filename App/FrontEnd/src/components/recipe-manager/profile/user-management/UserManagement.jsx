import './UserManagement.css'
import { useState } from "react";
import { useDispatch } from "react-redux";

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
        e?.preventDefault();
        dispatch(setCurrentUser({}));
        dispatch(setRecipes({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            allergies: [],
            dietaryPreferences: [],
            isLoading: false,
            hasErrors: false,
        }))
        dispatch(logout({
            recipesArray: [],
            hasErrors: false,
            isLoading: false,
            unsaved: 0
        }));

        if (onLogout) {
            onLogout(); //closes popup
        }
    }

    return (
        <div>
            <button type="button" onClick={handleLogout}>
                Logout
            </button>

            <button type="button" onClick={handleMyProfileClick}>
                My Profile
            </button>

            <ManageProfile open={myProfileOpen} onClose={handleMyProfileClose}></ManageProfile>

        </div>
    )
}

export default UserManagement
