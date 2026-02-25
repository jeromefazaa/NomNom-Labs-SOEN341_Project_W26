import { useSelector } from "react-redux";
import "../styles/LoadingBar.css";

function LoadingBar() {
  const appIsLoading = useSelector((state) => state.appState?.isLoading );
  const recipesIsLoading = useSelector( (state) => state.recipes?.isLoading);

  const userIsLoading = useSelector((state) => state.currentUser?.isLoading);

  const showLoadingBar = appIsLoading || recipesIsLoading || userIsLoading;
  debugger;
  return (
    <>
      {showLoadingBar && (
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
          <h1  style={{color: 'black'}} >Hi I am a loading bar</h1>
        </div>
      )}
    </>
  );
}

export default LoadingBar;
