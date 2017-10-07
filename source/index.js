import React from 'react';
import ReactDOM from 'react-dom';
import SDK from 'matrix-js-sdk'
import App from './components/App.jsx';

import './style.css';

// SDK documentation: https://matrix-org.github.io/matrix-js-sdk/0.8.4/module-client.html
let client = SDK.createClient({
    accessToken: 'xxx',
    baseUrl: 'https://matrix.org',
    userId: '@your_username:matrix.org'
});

ReactDOM.render(<App client={client}/>, document.getElementById('app-root'));
