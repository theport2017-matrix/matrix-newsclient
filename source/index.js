import React from 'react';
import ReactDOM from 'react-dom';
import SDK from 'matrix-js-sdk'
import App from './components/App.jsx';

import settings from '../env/settings.yml';
import './style.scss';

// SDK documentation: https://matrix-org.github.io/matrix-js-sdk/0.8.4/module-client.html
let client = SDK.createClient({
    accessToken: settings['client-access-token'],
    baseUrl: settings['base-url'],
    userId: settings['client-user-id']
});

ReactDOM.render(<App client={client}/>, document.getElementById('app-root'));
