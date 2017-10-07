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
    props.client.startClient();
    setTimeout(() => {
      console.info('Back paginating to get older events!');
      props.client.scrollback(props.client.getRoom(ROOM_ID));
    }, 1000)
  }

  render() {
    return (
      <div className="root">
        <div className="column1">
          <div className="column1-row1">
            <WeatherBox data={this.state.weather}/>
          </div>
          <div className="column1-row2">
            <News news={this.state.news} />
          </div>
        </div>
        <div className="column2">
          <div className="column2-row1">
            <AnnouncementBox announcements={this.state.announcements}/>
          </div>
          <div className="column2-row1">
            <Twitter ref={(box) => {this.twitterBox = box}}/>
          </div>
        </div>
      </div>);
  }
}
