import React from 'react';
import ReactDOM from 'react-dom';
import SDK from 'matrix-js-sdk'
import App from './components/App.jsx';

import './style.scss';

// SDK documentation: https://matrix-org.github.io/matrix-js-sdk/0.8.4/module-client.html
let client = SDK.createClient({
    accessToken: 'MDAxOGxvY2F0aW9uIG1hdHJpeC5vcmcKMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDI5Y2lkIHVzZXJfaWQgPSBAcGVkcm9fdGVzdDptYXRyaXgub3JnCjAwMTZjaWQgdHlwZSA9IGFjY2VzcwowMDIxY2lkIG5vbmNlID0gKzMjLFI5blJNUTgyVS1LZAowMDJmc2lnbmF0dXJlINMcSs_OD2POtXIpgk_LzZJalIhvToEuwOr-8r6hApQ3Cg',
    baseUrl: 'https://matrix.org',
    userId: '@pedro_test:matrix.org'
});

ReactDOM.render(<App client={client}/>, document.getElementById('app-root'));
