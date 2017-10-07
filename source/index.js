import React from 'react';
import ReactDOM from 'react-dom';
import SDK from 'matrix-js-sdk'
import App from './components/App.jsx';

import './style.css';

ReactDOM.render(<App />, document.getElementById('app-root'));

// SDK documentation: https://matrix-org.github.io/matrix-js-sdk/0.8.4/module-client.html
client = SDK.createClient("https://matrix.org");

client.on("event", function(event) {
  console.log("Received event: %s", event.getType());
});

client.publicRooms(function(err, data) {
    console.log("Public Rooms: %s", JSON.stringify(data));
});

client.startClient();
