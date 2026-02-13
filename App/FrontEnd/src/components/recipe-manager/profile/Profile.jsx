import { useState } from 'react'
import './Profile.css'
import Authentication from './authentication/Authentication.jsx'
import UserManagement from './user-management/UserManagement.jsx'

function Profile(){
    return (
        <div>
        <Authentication></Authentication>
        <UserManagement></UserManagement>
        </div>
    )
}

export default Profile