export const getMovies = async (queriesValue) => {
  const token = localStorage.getItem("token-mediahub");
  const urlMovies = "http://localhost:3001/movies";

  let queries = "";
  if (queriesValue) {
    const { search, sort } = queriesValue;

    if (search) {
      queries += `?query=${search}`;
    }

    if (sort) {
      let sortBy = "";
      switch (sort) {
        case "rottenRating":
          sortBy = "Rotten%20Tomatoes%20Rating";
          break;
        case "imdbRating":
          sortBy = "IMDB%20Rating";
          break;
        case "imdbVotes":
          sortBy = "IMDB%20Votes";
          break;
      }

      queries += queries ? `&sortBy=${sortBy}` : `?sortBy=${sortBy}`;
    }
  }

  return fetch(`${urlMovies}${queries}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};


export const getDetailMovie = async (id) => {
  const token = localStorage.getItem("token-mediahub");
  const urlMovies = "http://localhost:3001/movies";

  return fetch(`${urlMovies}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
