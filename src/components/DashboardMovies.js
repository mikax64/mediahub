import React, { useState, useEffect, useContext } from "react";
import MoviesList from "./MoviesList";
import FilterBar from "./FilterBar";


const DashboardMovies = () => {
 

  useEffect(() => {


  }, []);

  const [queriesValue, setQueriesValue] = useState("");

  const handleQueriesValue= (values) => {
    setQueriesValue(values);
  };



  return (
    <div className="app-dashboard wrapper">

      <FilterBar onChangeQueries={handleQueriesValue} />
      <MoviesList queriesValue={queriesValue} />
    </div>
  );
};

export default DashboardMovies;
