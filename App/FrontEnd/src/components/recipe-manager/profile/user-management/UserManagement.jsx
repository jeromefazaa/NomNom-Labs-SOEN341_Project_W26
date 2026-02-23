import './UserManagement.css'
import ManageProfileButton from './profile-management/ManageProfileButton.jsx'
import { useDispatch } from "react-redux";

import { logout } from '../../../../redux/slices/appStateSlice.js';
import { setCurrentUser } from '../../../../redux/slices/currentUserSlice.js';
import { setRecipes } from '../../../../redux/slices/recipesSlice.js';


function UserManagement({ onLogout, isLoggedIn }) {
    const dispatch = useDispatch();

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

            <button>
                My Profile
            </button>


            <ManageProfileButton></ManageProfileButton>
        </div>
    )
}

export default UserManagement
