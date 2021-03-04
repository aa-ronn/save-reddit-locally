import "./show-favorites.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCalendar,
  faExternalLinkAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export const ShowFavorites = ({ update }) => {
  const [localStorageValues, setLocalStorageValues] = useState(new Array(0));
  const [sortOrder, setSortOrder] = useState("date");

  const localStorageToArray = () => {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    setLocalStorageValues(values);
  };

  useEffect(() => {
    localStorageToArray();
  }, [update]);

  const handleUnfavoritePost = (name) => {
    localStorage.removeItem(name);
    localStorageToArray();
  };

  const handleSortOrderChange = (event) => {
    const { name } = event.target;

    switch (name) {
      case "date":
        localStorageToArray();
        setSortOrder("date");
        break;
      case "upvote-desc":
        localStorageValues.sort((a, b) => b.score - a.score);
        setLocalStorageValues(localStorageValues);
        setSortOrder("upvote-desc");
        break;
      case "upvote-asc":
        localStorageValues.sort((a, b) => a.score - b.score);
        setLocalStorageValues(localStorageValues);
        setSortOrder("upvote-asc");
        break;
      default:
        break;
    }
  };

  return (
    <div className="show-favorites">
      <div className="sort-options">
        <div className="title">Saved Posts</div>
        <div className="buttons">
          <span className="tiny-title">sort:</span>
          <button
            name="date"
            className={sortOrder === "date" ? "selected" : ""}
            onClick={handleSortOrderChange}
          >
            <FontAwesomeIcon icon={faCalendar} className="faicon" />
          </button>
          <button
            name="upvote-desc"
            className={sortOrder === "upvote-desc" ? "selected" : ""}
            onClick={handleSortOrderChange}
          >
            <FontAwesomeIcon icon={faArrowUp} className="faicon" />
          </button>
          <button
            name="upvote-asc"
            className={sortOrder === "upvote-asc" ? "selected" : ""}
            onClick={handleSortOrderChange}
          >
            <FontAwesomeIcon icon={faArrowDown} className="faicon" />
          </button>
        </div>
      </div>
      {localStorageValues.length ? (
        <div className="content">
          <div className="grid-item">
            <div className="results-list">
              {localStorageValues.map((item, index) => {
                return (
                  <div key={index} className="favorite-item">
                    <div className="options-wrapper">
                      <button onClick={() => handleUnfavoritePost(item.name)}>
                        <FontAwesomeIcon icon={faTrashAlt} className="faicon" />
                      </button>
                      <button>
                        <a
                          href={`https://www.reddit.com/r/${item.subreddit}/comments/${item.name}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FontAwesomeIcon
                            icon={faExternalLinkAlt}
                            className="faicon"
                          />
                        </a>
                      </button>
                    </div>
                    <div className="post-details">
                      <div className="post-subreddit grid-item">
                        <span>r/ </span>
                        {item.subreddit}
                      </div>
                      <div className="post-author grid-item">
                        <span>op </span> {item.author}
                      </div>
                      <div className="post-stars grid-item">
                        <FontAwesomeIcon icon={faArrowUp} className="faicon" />{" "}
                        {item.score}
                      </div>
                      <div className="post-title">{item.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-results-yet">
          Try favoriting a post! They will show up here.
        </div>
      )}
    </div>
  );
};
