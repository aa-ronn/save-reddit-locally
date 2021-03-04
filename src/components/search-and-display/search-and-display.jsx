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

export const SearchAndDisplay = ({ notifyAddFavorite }) => {
  const [searchReturnValue, setSearchReturnValue] = useState(null);
  const [subRedditInputValue, setSubRedditInputValue] = useState("");
  const [limitValue, setLimitValue] = useState("?limit=10");
  const inputRef = useRef(null);

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
      .catch((error) => {
        alert("No subreddit found with that name. Try again.");
        setSubRedditInputValue("");
        inputRef.current.focus();
      });
  };

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
