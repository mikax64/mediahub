import React, {  useState, useEffect } from "react";
import { getMovies, getDetailMovie } from "../services/MoviesService";

const MoviesList = ({ queriesValue }) => {
  const [movies, setMovies] = useState([]);
  const [detailMovie, setDetailMovie] = useState(null);
  const [historyMovies, sethistoryMovies] = useState(null);

  useEffect(() => {
    const filterMovies = async (queriesValue) => {
        const resultMovies = await getMovies(queriesValue);
        setMovies(resultMovies);
  
    };
    if (queriesValue) {
      filterMovies(queriesValue);
    }
   
  }, [queriesValue]);

  const openDetail = async (id) => {
    const dataDetailMovie = await getDetailMovie(id);
    setDetailMovie(dataDetailMovie);
    
    const historyMovies = localStorage.getItem('historyMovies');
    
    if (historyMovies) {
      const historyList = JSON.parse(historyMovies);
      const updatedList = historyList.filter(movie => movie.id !== id);
      updatedList.push(dataDetailMovie);
      
      localStorage.setItem('historyMovies', JSON.stringify(updatedList));
      console.log('historyList', updatedList);
    } else {
      const arrayHistory = [dataDetailMovie];
      
      localStorage.setItem('historyMovies', JSON.stringify(arrayHistory));
      console.log('arrayHistory', arrayHistory);
    }
  };

  const closeDetail = async (id) => {
    setDetailMovie(null);
  };
  const openHistory =  () => {
    const historyMovies = localStorage.getItem('historyMovies')
    sethistoryMovies(JSON.parse(historyMovies))
    
  };

  const closeHistory  =  () => {
    sethistoryMovies(null);
  };

  return (
    <div className="app-login wrapper">
      <div className="see-history" onClick={openHistory}>Voir l'historique</div>
      <ul className="movies-list">
        {movies &&
          movies.length > 0 &&
          movies.map((movie) => (
            <li
              className="movie-card"
              key={movie.id}
              onClick={() => openDetail(movie.id)}
            >
              {movie.Title}
              <div className="details-bt">Details</div>
            </li>
          ))}
      </ul>

      {detailMovie && (
        <div className="popup-wrapper">
          <div className="popup-detail">
            <div className="close-popup" onClick={closeDetail}>
              CLOSE
            </div>
            <h1> {detailMovie.Title}</h1>
            <p>
              <span>Release Date : </span>
              {detailMovie["Release Date"]}
            </p>

            <p>
              <span>Production Budget : </span>
              {detailMovie["Production Budget"]}
            </p>
            <p>
              <span>Majour Genre : </span>
              {detailMovie["Production Budget"]}
            </p>
            <p>
              <span>IMDB Rating : </span>
              {detailMovie["IMDB Rating"]}
            </p>
            <p>
              <span>IMDB Votes : </span>
              {detailMovie["IMDB Votes"]}
            </p>
          </div>
        </div>
      )}

      {historyMovies && (
        <div className="popup-wrapper">
          <div className="popup-detail">
            <div className="close-popup" onClick={closeHistory}>
              CLOSE
            </div>
            <ul className="list-history">
              {historyMovies.length > 0 &&
                historyMovies.map((movie) => (
                  <li  key={movie.id}>
                    {movie.Title}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
