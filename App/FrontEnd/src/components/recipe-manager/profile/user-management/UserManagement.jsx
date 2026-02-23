import './UserManagement.css'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/slices/appStateSlice";
import { useNavigate } from 'react-router-dom';
import ManageProfile from './profile-management/ManageProfile';

function UserManagement({ onLogout, isLoggedIn }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    function handleMyProfile(e){
        e?.preventDefault();

        navigate("/ManageProfile");

    }

    return (
        <div>
            <button type="button" onClick={handleLogout}>
                Logout
            </button>

            <button type="button" onClick={handleMyProfile}>
                My Profile
            </button>
<<<<<<< Updated upstream


            <ManageProfileButton></ManageProfileButton>
=======
            
>>>>>>> Stashed changes
        </div>
    )
}

export default UserManagement
