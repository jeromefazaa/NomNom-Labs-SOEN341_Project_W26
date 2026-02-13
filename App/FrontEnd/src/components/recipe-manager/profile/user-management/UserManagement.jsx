import { useState } from 'react'
import './UserManagement.css'
import LogoutButton from './logout-button/LogoutButton.jsx'
import ManageProfileButton from './profile-management/ManageProfileButton.jsx'
function UserManagement(){
    return (
        <div>
            <LogoutButton></LogoutButton>
            <ManageProfileButton></ManageProfileButton>
        </div>
    )
}

export default UserManagement