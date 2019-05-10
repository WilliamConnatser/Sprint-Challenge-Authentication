import React, {Component} from 'react';
import axios from 'axios';

export default class Form extends Component {
    state = {
        username: '',
        password: ''
    }
    changeHandler = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    submitHandler = event => {
        event.preventDefault();

        if (this.props.register) {
            this
                .register()
                .then(_ => {
                    this
                        .props
                        .history
                        .push('/');
                })
        } else {
            this
                .login()
                .then(_ => {
                    this
                        .props
                        .history
                        .push('/');
                });
        }
    }
    register() {
        return axios
            .post('http://localhost:5000/api/register', this.state)
            .then(response => {
                localStorage.setItem('token', response.data.token)
            })
            .catch(error => {
                alert(error.response.data.message)});
    }
    login() {
        return axios
            .post('http://localhost:5000/api/login', this.state)
            .then(response => {
                localStorage.setItem('token', response.data.token)
            })
            .catch(error => {
                alert(error.response.data.message)});
    }

    render() {
        return (
            <div>
                <h2>{this.props.register ? 'Register' : 'Login'}</h2>
                <form onSubmit={this.submitHandler}>
                    <input
                        id="username"
                        onChange={this.changeHandler}
                        value={this.state.username}
                        placeholder="username"/><br/>
                    <input
                        id="password"
                        onChange={this.changeHandler}
                        value={this.state.password}
                        placeholder="password"/><br/>
                        <button type="submit">{this.props.register ? 'Register' : 'Login'}</button>
                </form>
            </div>
        )
    }
}
