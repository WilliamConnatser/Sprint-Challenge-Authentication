import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import './App.css';

import Joke from './Joke';
import Form from './Form';
import withAuth from './auth';
const JokeWithAuth = withAuth(Joke)

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Joke App Is Jpke</h1>
                <div className="App-header-nav">
                    <NavLink
                        to="/register"
                        activeStyle={{
                        textDecoration: 'underline'
                    }}>Register</NavLink>
                    <NavLink
                        to="/login"
                        activeStyle={{
                        textDecoration: 'underline'
                    }}>Login</NavLink>
                    <button>Logout</button>
                </div>
            </header>
            <Route path="/" component={JokeWithAuth}/>
            <Route path="/login" component={JokeWithAuth}/>
            <Route path="/register" render={_ =>< JokeWithAuth register />}/>
        </div>
    );
}

export default App;
