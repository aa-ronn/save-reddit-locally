/**
 * Aaron Perry
 * SENG3080 - Frontend Programming Assignment
 * 2021-03-04
 * search-and-display.jsx
 * Allows the user to perform searches for hot posts from any user input
 * subreddit...if it exists.
 */

import "./search-and-display.scss";
import axios from "axios";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faExternalLinkAlt,
  faArrowUp,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Displays all currently saved Reddit posts found in the local browser storage.
 * Each post displayed will have a delete and navigate to button as well as
 * show basic information about the post.
 * @param notifyAddFavorite callback function to tell App.jsx to update it's
 * local useState value forcing the re-render of the favorites section.
 * @returns SearchAndDisplay component
 */
export const SearchAndDisplay = ({ notifyAddFavorite }) => {
  const [searchReturnValue, setSearchReturnValue] = useState(null);
  const [subRedditInputValue, setSubRedditInputValue] = useState("");
  const [limitValue, setLimitValue] = useState("?limit=10");
  const inputRef = useRef(null);

  /**
   * Queries the Reddit API to get the top 10, 50, or 100 top hot posts from
   * the currently input subreddit name.
   * @param {*} event form submit event
   */
  const handleGetNewHotPosts = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://www.reddit.com/r/${subRedditInputValue}/hot.json${limitValue}`
      )
      .then((res) => {
        const data = res.data.data.children;
        setSearchReturnValue(data);
      })
      .catch(() => {
        alert("No subreddit found with that name. Try again.");
        setSubRedditInputValue("");
        inputRef.current.focus();
      });
  };

  /**
   * Handles the onChange events for all input controlls in the component.
   * based on the id of the input a different action is taken: update the
   * search box state or update the selected post query amount.
   * @param {*} event input change event
   */
  const handleChange = (event) => {
    const { value, id } = event.target;

    switch (id) {
      case "subreddit":
        setSubRedditInputValue(value);
        break;
      case "limit-10":
        setLimitValue("?limit=10");
        break;
      case "limit-50":
        setLimitValue("?limit=50");
        break;
      case "limit-100":
        setLimitValue("?limit=100");
        break;
      default:
        break;
    }
  };

  /**
   * Handles the event of the user clicking the save icon button. Adds the selected
   * post to the local browser storage as a JSON string object, signals App.js
   * with notifyAddFavorite(), removes the item from the displayed search results,
   * and sets the new search result list for component re-render.
   * @param {*} index the index of the post of read the API while mapping
   * @param {*} name the unique token for the post
   * @param {*} score the number of upvotes on the post
   * @param {*} title the title of the post
   * @param {*} subreddit the subreddit where the post was posted
   * @param {*} author the author of the post
   * @param {*} permalink the permalink to the comment section of the post
   */
  const handleFavoritePost = (
    index,
    name,
    score,
    title,
    subreddit,
    author,
    permalink
  ) => {
    localStorage.setItem(
      name,
      JSON.stringify({
        name: name,
        title: title,
        score: score,
        subreddit: subreddit,
        author: author,
        permalink: permalink,
      })
    );
    notifyAddFavorite();
    searchReturnValue.splice(index, 1);
    setSearchReturnValue([...searchReturnValue]);
  };

  return (
    <div className="search-and-display">
      <div className="search-group">
        <form onSubmit={handleGetNewHotPosts}>
          <div className="radios-group">
            <div className="radios">
              <input
                type="radio"
                id="limit-10"
                name="search-limit"
                value="limit-10"
                defaultChecked
                onClick={handleChange}
              />
              <label htmlFor="limit-10">10</label>
              <input
                type="radio"
                id="limit-50"
                name="search-limit"
                value="limit-50"
                onClick={handleChange}
              />
              <label htmlFor="limit-50">50</label>
              <input
                type="radio"
                id="limit-100"
                name="search-limit"
                value="limit-50"
                onClick={handleChange}
              />
              <label htmlFor="limit-100">100</label>
            </div>
          </div>
          <input
            ref={(ref) => (inputRef.current = ref)}
            id="subreddit"
            name="subreddit"
            type="text"
            value={subRedditInputValue}
            onChange={handleChange}
            placeholder="Search"
            autoFocus
            required
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} className="faicon" />
          </button>
        </form>
      </div>
      {searchReturnValue ? (
        <div className="content">
          <div className="grid-item">
            <div className="results-list">
              {searchReturnValue.map((item, index) => {
                return (
                  <div key={index} className="favorite-item">
                    <div className="options-wrapper">
                      <button
                        onClick={() =>
                          handleFavoritePost(
                            index,
                            item.data.name.split("_")[1],
                            item.data.score,
                            item.data.title,
                            item.data.subreddit,
                            item.data.author,
                            item.data.permalink
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faSave} className="faicon" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.reddit.com/${item.data.permalink}', '_blank'`
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
                        {item.data.subreddit}
                      </div>
                      <div className="post-author grid-item">
                        <span>op </span> {item.data.author}
                      </div>
                      <div className="post-stars grid-item">
                        <FontAwesomeIcon icon={faArrowUp} className="faicon" />{" "}
                        {item.data.score}
                      </div>
                      <div className="post-title">{item.data.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-results-yet">
          Go head, search for your favorite subreddit.
        </div>
      )}
    </div>
  );
};
