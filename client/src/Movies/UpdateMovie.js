import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

const UpdateMovie = (props) => {
    const { setMovieList, movies, getMovieList } = props;
    const [movie, setMovie] = useState();
    const { id } = useParams();
    const { push } = useHistory();

    const fetchMovie = (id) => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => setMovie(res.data))
          .catch((err) => console.log(err.response));
      };
    
      useEffect(() => {
        fetchMovie(id);
      }, [id]);

    const onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setMovie({
            ...movie,
            [name]: value
        })
    };

    const onSubmit = e => {
        e.preventDefault();

        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            setMovie(res.data);
            getMovieList();
            push('/');
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='update-container'>
            <form onSubmit={onSubmit}>
                <input 
                    type='text'
                    name='title'
                    placeholder='Title'
                    // value={movie.title}
                    onChange={onChange}
                />
                <input 
                    type='text'
                    name='director'
                    placeholder='Director'
                    // value={movie.director}
                    onChange={onChange}
                />
                <input 
                    type='text'
                    name='metascore'
                    placeholder='Metascore'
                    // value={movie.metascore}
                    onChange={onChange}
                />
                <button>Submit</button>
            </form>         
        </div>
    );
};

export default UpdateMovie;