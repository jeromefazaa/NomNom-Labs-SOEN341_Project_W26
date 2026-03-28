import { saveRecipes } from '../../../redux/slices/recipesSlice';
//import './SaveButton.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SaveButton() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.appState.isLoggedIn)
  const [showSaveNotice, setShowSaveNotice] = useState(false);

  async function saveChanges() {
    console.log(`on click save changes`)
    try {
      await dispatch(saveRecipes()).unwrap();
      // Small UI change: keep this popup local to the recipe save button flow.
      setShowSaveNotice(true);
      window.setTimeout(() => {
        setShowSaveNotice(false);
      }, 2500);
    } catch (error) {
      setShowSaveNotice(false);
    }
  }
  return (
  <>
    {showSaveNotice && (
      <div className="save-toast" role="status" aria-live="polite">
        Save successful
      </div>
    )}
    <div className="save-wrapper">
      <button
        type="button"
        className="btn btn-primary"
        onClick={saveChanges}
        disabled={!isLoggedIn}
      >
        Save Changes
      </button>
    </div>
  </>
)
}



export default SaveButton;
