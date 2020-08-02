import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import App from './App';
import AuthProvider from './Context/AuthContext';

ReactDOM.render(<AuthProvider><App /></AuthProvider>, document.getElementById('root'));
