import './UserManagement.css'
import LogoutButton from './logout-button/LogoutButton.jsx'
import ManageProfileButton from './profile-management/ManageProfileButton.jsx'
function UserManagement({ onLogout, isLoggedIn }) {
    return (
        <div>
            {isLoggedIn && <LogoutButton onLogout={onLogout}></LogoutButton>}
            <ManageProfileButton></ManageProfileButton>
        </div>
    )
}

export default UserManagement
