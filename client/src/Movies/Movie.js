import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const deleteHandler = e => { 
    e.preventDefault()
    axios.delete(`http://localhost:5000/api/movies/${params.id}`, movie)
    .then(res => {
      // props.setMovieList(res.data)
      console.log(res)
      history.push(`/movies`)
  })
     .catch(err => console.log(err))
  }

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      
      <button onClick={() => history.push(`/update-movie/${params.id}`)}>Edit</button>
      <button onClick={deleteHandler}>DELETE</button>
      
    </div>
  );
}

export default Movie;
