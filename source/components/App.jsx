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
          Weather
        </div>
      </div>);
  }
}
