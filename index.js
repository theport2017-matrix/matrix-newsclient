// SDK documentation: https://matrix-org.github.io/matrix-js-sdk/0.8.4/module-client.html
var sdk = require("matrix-js-sdk");
client = sdk.createClient("https://matrix.org");

client.on("event", function(event) {
  console.log("Recieved event: %s", event.getType());
});

client.publicRooms(function(err, data) {
    console.log("Public Rooms: %s", JSON.stringify(data));
});

client.startClient();
