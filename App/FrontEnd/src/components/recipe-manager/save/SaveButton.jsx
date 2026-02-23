import { saveRecipes } from '../../../redux/slices/recipesSlice';
//import './SaveButton.css'
import { useDispatch, useSelector } from 'react-redux';

function SaveButton() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.appState.isLoggedIn)
  function saveChanges() {
    console.log(`on click save changes`)
    dispatch(saveRecipes());
  }
  return (
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
)
}



export default SaveButton;