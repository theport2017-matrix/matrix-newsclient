import React from 'react';

import WeatherBox from './Weather.js';
import AnnouncementBox from './AnnouncementBox.jsx';
import News from './News';
import Twitter from './Twitter';

const ROOM_ID = '!OfRBJBuhWHWNKplCtn:matrix.org';
const TWITTER_ROOM_ID = '!kgfNoSRLkBFxmVGvxw:matrix.org';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "announcements": [],
      "news": [],
      "weather": []
    };
    props.client.on("Room.timeline", (event) => {
        console.info(event.getType());
        if (event.getRoomId() == ROOM_ID) {
            switch (event.getType()) {
              case 'm.room.message':
                this.setState({
                  announcements: this.state.announcements.concat([event.getContent()]),
                });
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
    props.client.on("sync", (state) => {
      if (state === "SYNCING") {
        setTimeout(() => {
          console.info('Back paginating to get older events!');
          props.client.scrollback(props.client.getRoom(ROOM_ID));
        }, 1000)
      }
    });

    props.client.startClient();
  }

  render() {
    return (
      <div className="root">
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
            Built with React and powered by Matrix
          </div>
        </div>
      </div>
    );
  }
}
