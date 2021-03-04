import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.scss";

import { SearchAndDisplay } from "./components/search-and-display/search-and-display";
import { ShowFavorites } from "./components/show-favorites/show-favorites";
import { useState } from "react";

function App() {
  const [favoriteAdded, setFavoriteAdded] = useState(false);
  const handleAddFavorite = () => {
    setFavoriteAdded(!favoriteAdded);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
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
