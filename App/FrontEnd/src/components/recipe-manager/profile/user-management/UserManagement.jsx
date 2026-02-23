import './UserManagement.css'
import LogoutButton from './logout-button/LogoutButton.jsx'
import ManageProfileButton from './profile-management/ManageProfileButton.jsx'
import { logout } from "App/FrontEnd/"

function UserManagement({ onLogout, isLoggedIn }) {
    return (
        <div>
            <button>
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
