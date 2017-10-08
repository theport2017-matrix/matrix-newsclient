import React from 'react';
import ReactDOM from 'react-dom';
import SDK from 'matrix-js-sdk'
import App from './components/App.jsx';

import './style.scss';

// SDK documentation: https://matrix-org.github.io/matrix-js-sdk/0.8.4/module-client.html
let client = SDK.createClient({
    accessToken: 'MDAxYWxvY2F0aW9uIGNvbW11bmkuY2FtcAowMDEzaWRlbnRpZmllciBrZXkKMDAxMGNpZCBnZW4gPSAxCjAwMjVjaWQgdXNlcl9pZCA9IEBuZXdzOmNvbW11bmkuY2FtcAowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9IEpmTFJRX3gqNGFDWGRYXjAKMDAyZnNpZ25hdHVyZSBCqqE2BVHDcxKT0vP54dcpCOp8xeGSA0MvH6YYdCzZDwo',
    baseUrl: 'https://communi.camp',
    userId: '@news:communi.camp'
});

ReactDOM.render(<App client={client}/>, document.getElementById('app-root'));
