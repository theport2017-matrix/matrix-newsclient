import moment from 'moment';
import React from 'react';

import WeatherBox from './Weather.js';
import AnnouncementBox from './AnnouncementBox.jsx';
import News from './News';
import Twitter from './Twitter';
import EmergencyOverlay from './Emergency.js';

const ROOM_ID = '!OfRBJBuhWHWNKplCtn:matrix.org';
const TWITTER_ROOM_ID = '!kgfNoSRLkBFxmVGvxw:matrix.org';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "announcements": [],
      "news": [],
      "weather": [],
      "emergency": null
    };
  }

  componentDidMount() {
    this.props.client.on("Room.timeline", (event) => {
        if (event.getRoomId() == ROOM_ID) {
            switch (event.getType()) {
              case 'm.room.message':
                const content = event.getContent();
                const ts = moment(event.getTs());
                if (content.level === 'emergency') {
                  // check that emergency alert is recent (< 30s old)
                  if (moment().diff(ts) < 30000) {
                    this.setState({
                      emergency: content.body
                    });
                  }
                } else {
                  this.setState({
                    announcements: this.state.announcements.concat([content]),
                  });
                }
                break;
              case 'c.news':
                this.setState({
                  news: this.state.news.concat([event.getContent()]),
                });
                break;
              case 'c.weather':
                this.setState({
                  weather: this.state.weather.concat([event.getContent()]),
                });
                break;
            }
        }
        if (event.getRoomId() == TWITTER_ROOM_ID && event.getType() == 'm.room.message') {
            this.twitterBox.addTweet(event);
        }
    });
    this.props.client.on("sync", (state) => {
      if (state === "SYNCING") {
        setTimeout(() => {
          console.info('Back paginating to get older events!');
          this.props.client.scrollback(this.props.client.getRoom(ROOM_ID), 1000);
        }, 1000)
      }
    });

    this.props.client.startClient();
  }

  render() {
    return (
      <div className="root">
        <EmergencyOverlay message={this.state.emergency}/>
        <div className="header">
          <h1>Communicamp</h1>
        </div>
        <div className="content">
          <WeatherBox data={this.state.weather}/>
          <News news={this.state.news}/>
        </div>
        <div className="sidebar">
          <AnnouncementBox announcements={this.state.announcements}/>
          <Twitter ref={(box) => {this.twitterBox = box}}/>
        </div>
        <div className="footer">
          <div>
            Built with React and powered by [matrix] and newsAPI.org
          </div>
        </div>
      </div>
    );
  }
}
