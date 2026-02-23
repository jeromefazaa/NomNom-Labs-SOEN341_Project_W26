import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import Authentication from './authentication/Authentication.jsx'
import UserManagement from './user-management/UserManagement.jsx'
import { useSelector } from 'react-redux'

function Profile({ open, onClose }) {

    const isLoggedIn = useSelector((state) => state.appState.isLoggedIn)

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ className: "profile-dialog" }}>
            <DialogTitle>Profile</DialogTitle>
            <DialogContent>
                {!isLoggedIn ? (
                    <Authentication onAuthSuccess={onClose} />
                ) : (
                    <UserManagement onLogout={onClose} />
                )}
            </DialogContent>
        </Dialog>
    )
}

export default Profile