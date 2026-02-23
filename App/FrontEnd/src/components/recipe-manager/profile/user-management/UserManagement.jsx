
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
        <div className="auth">
    <div className="user-actions">
      <button type="button" className="btn btn-secondary" onClick={handleLogout}>
        Logout
      </button>

      <button type="button" className="btn btn-primary">
        My Profile
      </button>

      <ManageProfileButton />
    </div>
  </div>
    )
}

export default UserManagement
