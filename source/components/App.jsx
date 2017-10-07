import React from 'react';
import News from './News';

const news = [ { title: 'Spain set for pro-unity rallies',
    body: 'Thousands are expected to rally in Spain against Catalonian independence, after a disputed referendum.',
    image: 'https://ichef.bbci.co.uk/images/ic/1024x576/p05j8tqr.jpg',
    local: false },
  { title: 'US braced for Hurricane Nate',
    body: 'The hurricane barrelling towards the US Gulf coast has caused at least 23 deaths in central America.',
    image: 'https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/BA1E/production/_98164674_042211428-1.jpg',
    local: false },
  { title: 'Tearful reunion after Las Vegas heroics',
    body: 'A Canadian woman reunites with the stranger who saved her after she had been shot in Las Vegas.',
    image: 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/16E5B/production/_98178739_reunion_976.jpg',
    local: false},
  { title: 'Trump rolls back free birth control',
    body: 'The new rule could strip birth control coverage from millions of women, demolishing an Obama provision.',
    image: 'https://ichef.bbci.co.uk/images/ic/1024x576/p05hdggf.jpg',
    local: false },
  { title: 'No more Shakespeare for Sir Ian McKellen?',
    body: 'The actor says his current role as King Lear is likely to be his last big Shakespeare role.',
    image: 'https://ichef.bbci.co.uk/images/ic/1024x576/p05j82jw.jpg',
    local: false },
  { title: 'Ryanair\'s top operations boss resigns',
    body: 'The airline will bid farewell to operations manager who had ultimate responsibility for pilot rosters',
    image: 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/3E88/production/_98180061_n7faahvq.jpg',
    local: false } ];

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
          <div className="column1-row2">
            <News news={news} />
          </div>
        </div>
        <div className="column2">
          <img src="data:image/png;base64,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" />
        </div>
      </div>);
  }
}
