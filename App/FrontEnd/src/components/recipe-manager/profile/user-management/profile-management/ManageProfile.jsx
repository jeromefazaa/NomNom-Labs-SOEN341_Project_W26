import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveCurrentUser } from '../../../../../redux/slices/currentUserSlice';
import { Dialog, DialogTitle, DialogContent } from '@mui/material'


function ManageProfile({ open, onClose }) {
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
    const handleCancel = () => {
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
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className="profile-dialog">
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
        <form className="auth-form profile-form">
            <div className="form-group">
            <label className="form-label">
                Email
            <input
                className="input"
                type="email"
                name="Email"
                disabled={true}
                value={email}
                />
            </label>
            </div>

            <div className="form-group">
            <label className="form-label">
                Password
                <input
                className="input"
                type="password"
                name="Password"
                onChange={handlePassword}
                disabled={!isEditing}
                value={password}
                />
            </label>
            </div>

            <div className="form-group">
            <label className="form-label">
                First Name
                <input
                className="input"
                type="text"
                name="firstName"
                onChange={handleFirstName}
                disabled={!isEditing}
                value={firstName}
                />
            </label>
            </div>

            <div className="form-group">
            <label className="form-label">
                Last Name
                <input
                className="input"
                type="text"
                name="lastName"
                onChange={handleLastName}
                disabled={!isEditing}
                value={lastName}
                />
            </label>
            </div>

            {/* Diet Preferences (Ingredients-style row) */}
            <div className="form-group">
            <div className="profile-section-title">Diet Preferences</div>

            <div className="inline-row">
                <input
                className="input"
                type="text"
                name="dietPreferences"
                onChange={handleDietPreferences}
                disabled={!isEditing}
                value={dietPreferences}
                placeholder="e.g., Vegetarian, Keto..."
                />

                <button
                type="button"
                className="btn btn-secondary inline-remove"
                disabled={!isEditing || !allergies}
                onClick={() => setDietPreferences("")}
                >
                Remove
                </button>
            </div>

            <button
                type="button"
                className="inline-add"
                disabled={!isEditing}
                onClick={() => {}}
            >
                ADD DIET PREFERENCE
            </button>
            </div>

            {/* Allergies (Ingredients-style row) */}
            <div className="form-group">
            <div className="profile-section-title">Allergies</div>

            <div className="inline-row">
                <input
                className="input"
                type="text"
                name="allergies"
                onChange={handleAllergies}
                disabled={!isEditing}
                value={allergies}
                placeholder="e.g., Peanuts, Gluten..."
                />

                <button
                type="button"
                className="btn btn-secondary inline-remove"
                disabled={!isEditing || !allergies}
                onClick={() => setAllergies("")}
                >
                Remove
                </button>
            </div>

            <button
                type="button"
                className="inline-add"
                disabled={!isEditing}
                onClick={() => {}}
            >
                ADD ALLERGY
            </button>
            </div>

            {/* Actions */}
            <div className="form-actions profile-actions">
            <button
                type="button"
                className={`btn ${isEditing ? "btn-primary" : "btn-secondary"}`}
                onClick={isEditing ? handleSubmit : handleEditing}
            >
                {isEditing ? "Save" : "Edit"}
            </button>

            {isEditing && (
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
                </button>
            )}
            </div>
        </form>
        </DialogContent>
        </Dialog>


    )
}

export default ManageProfile;