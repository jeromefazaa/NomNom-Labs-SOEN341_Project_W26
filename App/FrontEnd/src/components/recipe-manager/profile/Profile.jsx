import { useState } from 'react'
import './Profile.css'
import authentication from './components/recipe-manager/profile/authentication/Authentication.jsx'
import userManagement from './components/recipe-manager/profile/user-management/User-Management.jsx'

function Profile(){
    return (
        <div>
        <authentication></authentication>
        <userManagement></userManagement>
        </div>
    )
}

export default Profile