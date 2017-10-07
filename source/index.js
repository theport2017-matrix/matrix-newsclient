import React from 'react';
import ReactDOM from 'react-dom';
import SDK from 'matrix-js-sdk'
import App from './components/App.jsx';

import './style.css';

// SDK documentation: https://matrix-org.github.io/matrix-js-sdk/0.8.4/module-client.html
let client = SDK.createClient({
    accessToken: 'MDAxOGxvY2F0aW9uIG1hdHJpeC5vcmcKMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDI5Y2lkIHVzZXJfaWQgPSBAcGVkcm9fdGVzdDptYXRyaXgub3JnCjAwMTZjaWQgdHlwZSA9IGFjY2VzcwowMDIxY2lkIG5vbmNlID0gazF5Tmo9WmdeazFWOHkrSAowMDJmc2lnbmF0dXJlIBhV2WvHSmIaB-43hxaUNopzcpeGZFqRggMV75ZzUyfNCg',
    baseUrl: 'https://matrix.org',
    userId: '@pedro_test:matrix.org'
});

ReactDOM.render(<App client={client}/>, document.getElementById('app-root'));
