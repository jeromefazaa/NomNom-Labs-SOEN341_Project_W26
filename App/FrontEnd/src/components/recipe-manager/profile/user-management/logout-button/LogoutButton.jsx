
import { useNavigate } from 'react-router-dom'

function LogoutButton({ onLogout }) {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('isLoggedIn')
        if (onLogout) onLogout()
        navigate('/')
    }

    return (
        <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutButton
