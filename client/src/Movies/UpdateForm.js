import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const UpdateForm = props => { 
    const history = useHistory()
    const initialForm = {
        title: '',
        director: '',
        metascore: '',
        stars: [],
    }
    const [formState, setformState] = useState(initialForm)
    const {id} = useParams()

    useEffect(() => { 
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res.data)
            setformState(res.data)

        })
        .catch(err => console.log(err))
    }, [id])

    const formSubmit = (e) => {
        e.preventDefault();
       axios.put(`http://localhost:5000/api/movies/${id}`, formState)
       .then(res => {props.setMovieList(res.data)
        history.push(`/movies/${id}`)
    })
       .catch(err => console.log(err))
        console.log("Form submitted", formState);   
    }
      
    const inputChange = (e) => {
        e.persist();    
        setformState( {...formState,  [e.target.name]: e.target.value });
      };


    return (
        <div>
    <h1>Update Movie</h1>
    <form onSubmit={formSubmit}> 
        <input type='text' name='title' placeholder='title' onChange={inputChange} value={formState.title} ></input>
        <input type='text' name='director' placeholder='director' onChange={inputChange} value={formState.director}></input>
        <input type='text' name='metascore' placeholder='metascore' onChange={inputChange} value={formState.metascore}></input>
        <input type='text' name='stars' placeholder='stars' onChange={inputChange} value={formState.stars}></input>
      <button form-button>Update</button>
    </form>
    </div>
    )
}

export default UpdateForm