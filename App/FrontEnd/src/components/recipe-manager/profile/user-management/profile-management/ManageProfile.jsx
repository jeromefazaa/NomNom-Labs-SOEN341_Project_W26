import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ManageProfile.css'
import { saveCurrentUser } from '../../../../../redux/slices/currentUserSlice';


function ManageProfile() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.currentUser.email);
    const [password, setPassword] = useState(useSelector(state => state.currentUser.password));
    const [firstName, setFirstName] = useState(useSelector(state => state.currentUser.firstName));
    const [lastName, setLastName] = useState(useSelector(state => state.currentUser.lastName));
    const [dietPreferences, setDietPreferences] = useState(useSelector(state => state.currentUser.dietPreferences));
    const [allergies, setAllergies] = useState(useSelector(state => state.currentUser.allergies));
    const [isEditing, setIsEditing] = useState(false);

    const handleEditing = () => {
        setIsEditing(edit => !edit);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleFirstName(e) {
        setFirstName(e.target.value);
    }

    function handleLastName(e) {
        setLastName(e.target.value);
    }

    function handleDietPreferences(e) {
        setDietPreferences(e.target.value);
    }

    function handleAllergies(e) {
        setAllergies(e.target.value);
    }

    async function handleSubmit(e) {
        e?.preventDefault();
        const data = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            dietPreferences: dietPreferences,
            allergies: allergies,
        };
        dispatch(saveCurrentUser(data))

    }

    return (
        <form>
            <label>Email:
                <input
                    type="email"
                    name="Email"
                    disabled={true}
                />
            </label>

            <label>Password:
                <input
                    type="password"
                    name="Password"
                    onChange={handlePassword}
                    disabled={!isEditing}
                />
            </label>

            <label>First Name:
                <input
                    type="text"
                    name="firstName"
                    onChange={handleFirstName}
                    disabled={!isEditing}
                />
            </label>

            <label>Last Name:
                <input
                    type="text"
                    name="lastName"
                    onChange={handleLastName}
                    disabled={!isEditing}
                />
            </label>

            <label>Diet preferences:
                <input
                    type="text"
                    name="dietPreferences"
                    onChange={handleDietPreferences}
                    disabled={!isEditing}
                />
            </label>

            <label>Allergies:
                <input
                    type="text"
                    name="allergies"
                    onChange={handleAllergies}
                    disabled={!isEditing}
                />
            </label>


            {/* When clicking button, Edit -> Save -> Edit 
                When clicking Save, missing saving and fetching information
            */}
            <button
                type="button"
                onClick={isEditing ? handleSubmit : handleEditing}
            >
                {isEditing ? "Save" : "Edit"}
            </button>
        </form>
    )
}

export default ManageProfile;