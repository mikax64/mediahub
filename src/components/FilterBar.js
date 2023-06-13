import React, { useState, useEffect } from "react";

const FilterBar = ({ onChangeQueries }) => {
  const [searchValue, setSearchValue] = useState("");
  const [checkboxValues, setCheckboxValues] = useState({
    rottenRating: false,
    imdbRating: false,
    imdbVotes: false
  });

  const [checkboxSelected, setCheckboxSelected] = useState('');

  const handleQueriesValue = () => {
    onChangeQueries({ search: searchValue, sort: checkboxSelected});
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    checked === true ?  setCheckboxSelected(name) :  setCheckboxSelected('')

    setCheckboxValues((prevState) => {
      const updatedValues = { ...prevState };

      Object.keys(updatedValues).forEach((key) => {
        if (key !== name) {
          updatedValues[key] = false;
        }
      });
      updatedValues[name] = checked;

      return updatedValues;
    }, );
  };

  const handleSearchChange = (event) => {
    console.log('HANDLE SEARCH')
    const value = event.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    const delay = 1000;
    const timer = setTimeout(() => {
      handleQueriesValue();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  
  useEffect(() => {
      handleQueriesValue();
  }, [checkboxSelected]);

  return (
    <div className="filter-bar">
      <div className="filter-bar-search">
        <input placeholder="Search movie..." type="text" value={searchValue} onChange={handleSearchChange} />
      </div>

      <div className="toggle-section">
        <label className="toggle">
          <input
            className="toggle-checkbox"
            type="checkbox"
            name="rottenRating"
            checked={checkboxValues.rottenRating}
            onChange={handleCheckboxChange}
          />
          <div className="toggle-switch"></div>
          <span className="toggle-label">RottenTomatoes Rate</span>
        </label>
      </div>

      <div className="toggle-section">
        <label className="toggle">
          <input
            className="toggle-checkbox"
            type="checkbox"
            name="imdbRating"
            checked={checkboxValues.imdbRating}
            onChange={handleCheckboxChange}
          />
          <div className="toggle-switch"></div>
          <span className="toggle-label">IMDB Rate</span>
        </label>
      </div>

      <div className="toggle-section">
        <label className="toggle">
          <input
            className="toggle-checkbox"
            type="checkbox"
            name="imdbVotes"
            checked={checkboxValues.imdbVotes}
            onChange={handleCheckboxChange}
          />
          <div className="toggle-switch"></div>
          <span className="toggle-label">IMDB Votes</span>
        </label>
      </div>
    </div>
  );
};

export default FilterBar;