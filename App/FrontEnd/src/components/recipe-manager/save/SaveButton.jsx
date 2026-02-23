import { saveRecipes } from '../../../redux/slices/recipesSlice';
import './SaveButton.css'
import { useDispatch, useSelector } from 'react-redux';

function SaveButton() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.appState.isLoggedIn)
  function saveChanges() {
    console.log(`on click save changes`)
    dispatch(saveRecipes());
  }
  return (
    <button className="save-button" onClick={saveChanges} disabled={!isLoggedIn}>
      Save Changes
    </button>
  )
}



export default SaveButton;