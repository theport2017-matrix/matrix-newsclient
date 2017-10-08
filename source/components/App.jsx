import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import React from 'react';

import AnnouncementBox from './Announcements.jsx';
import EmergencyOverlay from './Emergency.jsx';
import News from './News.jsx';
import Twitter from './Twitter.jsx';
import WeatherBox from './Weather.jsx';

const ROOM_ID = '!OfRBJBuhWHWNKplCtn:matrix.org';
const TWITTER_ROOM_ID = '!kgfNoSRLkBFxmVGvxw:matrix.org';
const MAX_ANNOUNCEMENT_AGE = 5; // hours

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
                if (moment().diff(ts, 'hours') > MAX_ANNOUNCEMENT_AGE) {
                  // exclude announcements older than 1h
                  return;
                }
                else if (content.level === 'emergency') {
                  // check that emergency alert is recent (< 10s old)
                  if (moment().diff(ts) < 10000) {
                    this.setState({
                      emergency: content.body
                    });
                    setTimeout(() => {
                      this.setState({
                        emergency: null,
                      });
                    }, 10000);
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
        <div className="header">
          <div className="header-title">
            <h1>
              C<FontAwesome name="dot-circle-o"/>mmuniCamp
            </h1>
          </div>
          <div className="header-weather">
            <WeatherBox data={this.state.weather}/>
          </div>
        </div>
        <div className="content">
          <News news={this.state.news}/>
        </div>
        <div className="sidebar-item sidebar">
          <Twitter ref={(box) => {this.twitterBox = box}}/>
        </div>
        <div className="footer">
          <div className="ticker-tape">
            <AnnouncementBox announcements={this.state.announcements}/>
          </div>
          <div className="footer-about">
            Built with React and powered by [matrix] and newsAPI.org
          </div>
        </div>
      </div>
    );
  }
}
