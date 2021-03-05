/**
 * Aaron Perry
 * SENG3080 - Frontend Programming Assignment
 * 2021-03-04
 * Simple application to query any subreddit's hot posts and save them
 * in locally using the local storage browser API. The app is responsive
 * to most screen sizes.
 */

import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.scss";

import { SearchAndDisplay } from "./components/search-and-display/search-and-display";
import { ShowFavorites } from "./components/show-favorites/show-favorites";
import { useState } from "react";

/**
 * The react application. The level holds one state to notify the
 * child rigth side Favorites section to update when a post is
 * saved by the use. When a favorite is the ShowFavorites component
 * is forced to re-rended getting the latest data found in the local
 * storage.
 * @returns the application
 */
function App() {
  const [favoriteAdded, setFavoriteAdded] = useState(false);

  /**
   * Called from SearchAndDisplay component, instructs the ShowFavorites
   * component to re-render by negating the current boolean value found
   * in the useState. The main thing is the change in ShowFavorites prop
   * state.
   */
  const handleAddFavorite = () => {
    setFavoriteAdded(!favoriteAdded);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="title"
          onClick={() =>
            window.open(
              "https://aa-ronn.github.io/save-reddit-locally/",
              "_self"
            )
          }
        >
          <FontAwesomeIcon icon={faSave} className="faicon" />{" "}
          <span>Reddit</span>
        </div>
      </header>
      <section className="App-content">
        <SearchAndDisplay notifyAddFavorite={handleAddFavorite} />
        <ShowFavorites update={favoriteAdded} />
      </section>
    </div>
  );
}

export default App;
