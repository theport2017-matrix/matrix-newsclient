import React from 'react';

import AnnouncementBox from './AnnouncementBox.jsx';

const ROOM_ID = '!OfRBJBuhWHWNKplCtn:matrix.org';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    props.client.on("event", (event) => {
        if (event.getRoomId() == ROOM_ID && event.getType() == 'm.room.message') {
            this.announcementBox.addMessage(event.getContent());
        }
    });
    props.client.startClient();
  }

  render() {
    return (
      <div class="root">
        <div class="column1">
          <div class="column1-row1">
            <AnnouncementBox ref={(box) => {this.announcementBox = box}}/>
          </div>
          <div class="column1-row2">
            News
          </div>
        </div>
        <div class="column2">
          Weather
        </div>
      </div>);
  }
}
