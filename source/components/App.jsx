import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import React from 'react';

import AnnouncementBox from './AnnouncementBox.jsx';
import EmergencyOverlay from './Emergency.jsx';
import News from './News.jsx';
import Twitter from './Twitter.jsx';
import WeatherBox from './Weather.jsx';

const ROOM_ID = '!OfRBJBuhWHWNKplCtn:matrix.org';
const TWITTER_ROOM_ID = '!kgfNoSRLkBFxmVGvxw:matrix.org';

let backPaginated = false;

import sirenWavUrl from '../siren.wav';
document.getElementById('audio').src = sirenWavUrl;

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
            const content = event.getContent();
            switch (event.getType()) {
              case 'm.room.message':
                const ts = moment(event.getTs());
                if (content.level === 'emergency') {
                  // check that emergency alert is recent (< 10s old)
                  if (moment().diff(ts) < 10000) {
                    this.setState({
                      emergency: content.body
                    });
                    document.getElementById('audio').play();
                  }
                } else {
                  this.setState({
                    announcements: this.state.announcements.concat([content]),
                  });
                }
                break;
              case 'c.news':
                content._timeReceived = event.getTs();
                this.setState({
                  news: this.state.news.concat([content]),
                });
                break;
              case 'c.weather':
                this.setState({
                  weather: this.state.weather.concat([content]),
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
        if (!backPaginated){
          backPaginated = true;
          setTimeout(() => {
            console.info('Back paginating to get older events!');
            this.props.client.scrollback(this.props.client.getRoom(ROOM_ID), 10000);
          }, 1000)
        }
      }
    });

    this.props.client.startClient();
  }

  render() {
    return (
      <div className="grid">
        <EmergencyOverlay message={this.state.emergency}/>
        <div className="grid-item header">
          <div className="header-title">
            <h1>
              C<FontAwesome name="dot-circle-o"/>mmuniCamp
            </h1>
          </div>
        </div>
        <div className="grid-item content">
          <News news={this.state.news}/>
        </div>
        <div className="grid-item sidebar-item sidebar-weather">
          <WeatherBox data={this.state.weather}/>
        </div>
        <div className="grid-item sidebar">
          <div className="sidebar-item sidebar-twitter">
            <Twitter ref={(box) => {this.twitterBox = box}}/>
          </div>
        </div>
        <div className="grid-item ticker-tape">
          <AnnouncementBox announcements={this.state.announcements}/>
        </div>
        <div className="grid-item footer">
          <div>
            Built with React and powered by [matrix] and newsAPI.org
          </div>
        </div>
      </div>
    );
  }
}
