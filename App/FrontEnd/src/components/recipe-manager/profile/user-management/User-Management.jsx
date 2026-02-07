import { useState } from 'react'
import './User-Management.css'
import logout from '../logout/Logout.jsx'
import profileManagement from '../profile-management/Profile-Management.jsx'


function UserManagement(){
    return (
        <div>
            <logout></logout>
            <profileManagement></profileManagement>
        </div>
    )
}

export default UserManagement