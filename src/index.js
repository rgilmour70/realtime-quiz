import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import 'react-rangeslider/lib/index.css';
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-vis/dist/style.css';
require('./ably');

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
