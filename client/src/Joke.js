import React, { Component } from 'react';
import axios from 'axios';

export default class Joke extends Component {
    state={
        jokes: []
    }

    componentDidMount() {
        return axios
            .get('http://localhost:5000/api/jokes')
            .then(response => {
                this.setState({jokes: response.data})
            })
            .catch(error => {
                alert(error.response.data.message)});
    }
  render() {
      const jokeElements = this.state.jokes && this.state.jokes.map(joke => <h4 key={joke.id}>{joke.joke}</h4>)
    return (
      <div>
        <h2>Jokes</h2>
        {jokeElements}
      </div>
    )
  }
}