import './UserManagement.css'
import LogoutButton from './logout-button/LogoutButton.jsx'
import ManageProfileButton from './profile-management/ManageProfileButton.jsx'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../redux/slices/appStateSlice";


function UserManagement({ onLogout, isLoggedIn }) {
    const dispatch = useDispatch();

    function handleLogout(e) {
        e?.preventDefault();

        dispatch(logout());

        if (onLogout) {
            onLogout(); //closes popup
        }
    }

    return (
        <div>
            <button type="button" onClick={handleLogout}>
                Logout
            </button>

            <button>
                My Profile
            </button>
            
            
            <ManageProfileButton></ManageProfileButton>
        </div>
    )
}

export default UserManagement
