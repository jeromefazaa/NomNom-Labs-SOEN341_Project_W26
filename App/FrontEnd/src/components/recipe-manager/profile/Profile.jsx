import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import './Profile.css'
import Authentication from './authentication/Authentication.jsx'
import UserManagement from './user-management/UserManagement.jsx'

function Profile({ open, onClose }) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Profile</DialogTitle>
            <DialogContent>
                <Authentication />
                <UserManagement onLogout={onClose} isLoggedIn={isLoggedIn} />
            </DialogContent>
        </Dialog>
    )
}

export default Profile
