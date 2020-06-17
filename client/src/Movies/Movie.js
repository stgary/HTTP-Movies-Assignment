import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const { addToSavedList, getMovieList } = props;
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleDelete = (id) => {
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      getMovieList();
      push('/')
    })
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className="update-button" onClick={() => push(`/update-movie/${id}`)}>
        Update
      </div>

      <div className="delete-button" onClick={() => {handleDelete(id)}}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
