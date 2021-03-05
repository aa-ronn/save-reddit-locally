/**
 * Aaron Perry
 * SENG3080 - Frontend Programming Assignment
 * 2021-03-04
 * show-favorites.jsx
 * Loads all saved Reddit posts from local storage to allow the user to
 * delete and navigate to.
 */

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

/**
 * Displays all currently saved Reddit posts found in the local browser storage.
 * Each post displayed will have a delete and navigate to button as well as
 * show basic information about the post.
 * @param {*} update used to re-render component when prop value changes.
 * @returns ShowFavorites component
 */
export const ShowFavorites = ({ update }) => {
  const [localStorageValues, setLocalStorageValues] = useState(new Array(0));
  const [sortOrder, setSortOrder] = useState("date");

  /**
   * Gets all the items from the local browser storage, parses the JSON strings
   * into objects and sets component state.
   */
  const localStorageToArray = () => {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    setLocalStorageValues(values);
  };

  /**
   * On every re-render of component get all locally stored posts. User
   * dependancy will tell the component to get new data when signal is
   * received (update prop value changes).
   */
  useEffect(() => {
    localStorageToArray();
  }, [update]);

  /**
   * Deletes a specific post from local storage and updates the component
   * state.
   * @param {*} name the unique id of the post
   */
  const handleUnfavoritePost = (name) => {
    localStorage.removeItem(name);
    localStorageToArray();
  };

  /**
   * Handles the event of the user clicking the sort buttons. Based on the
   * element's name an action is taken sort by date entered into local storage,
   * score desc and score asc.
   * @param {*} event button event
   */
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
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.reddit.com/${item.permalink}', '_blank'`
                          )
                        }
                      >
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          className="faicon"
                        />
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
