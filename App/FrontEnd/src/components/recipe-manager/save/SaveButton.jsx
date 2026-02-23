import './SaveButton.css'

function SaveButton(){
  return (
    <button className="save-button" onClick={saveChanges()}>
      Save Changes
    </button>
  )
}

function saveChanges() {



    alert('Changes saved!')
}

export default SaveButton;