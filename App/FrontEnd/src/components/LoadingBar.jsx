import { useSelector } from "react-redux";
import "../styles/LoadingBar.css";

function LoadingBar() {
  const appIsLoading = useSelector((state) => state.appState?.isLoading);
  const recipesIsLoading = useSelector((state) => state.recipes?.isLoading);
  const userIsLoading = useSelector((state) => state.currentUser?.isLoading);
  const mealPlannerIsLoading = useSelector((state) => state.mealPlanner?.isLoading);

  const showLoadingBar =
    appIsLoading ||
    recipesIsLoading ||
    userIsLoading ||
    mealPlannerIsLoading;
  return (
    <>
      {showLoadingBar && (
        <div
          className="loading-overlay"
          role="alert"
          aria-live="assertive"
          aria-busy="true"
        >
          <div className="loading-overlay-backdrop"></div>
          <div className="loading-spinner-panel">
            <div className="loading-spinner" aria-hidden="true"></div>
            <p className="loading-label">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
}

export default LoadingBar;
