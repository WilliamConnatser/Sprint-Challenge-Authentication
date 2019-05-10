import React from 'react';
import axios from 'axios';

axios
    .interceptors
    .request
    .use(config => {
        config.headers.Authorization = localStorage.getItem('token');
        return config;
    }, error => {
        Promise.reject(error);
    })

export default Component => class withAuth extends React.Component {
    render() {
        const token = localStorage.getItem('token');
        return ( <> {
            token
                ? <Component {...this.props}/>
                : this.props.history.push('/login')
        } </>
        )
    }
}