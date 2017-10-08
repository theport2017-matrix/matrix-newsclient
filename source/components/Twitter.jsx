import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import React from 'react';

export default class Twitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        }
    }

    addTweet(event) {
        var tweet = {sender: event.getSender(), content: event.getContent(), date: moment(event.getDate())};
        this.setState({tweets: this.state.tweets.concat([tweet])});
    }

    render() {
        const tweets = this.state.tweets;
        return (
            <div>
                <h2>
                  <FontAwesome name="bullhorn" className="title-icon"/>
                  Tweet Feed
                </h2>
                <ul className="twitter-feed">
                    {tweets.filter((item) => (item.content.body != undefined)).map((item, i) => (
                        <li className="tweet" key={i}>
                            <div className="tweet-title">
                                <div className="tweet-sender-text">
                                  <span className="tweet-sender">{item.sender}</span> said:
                                </div>
                                <div className="tweet-calendar">{item.date.calendar().toLowerCase()}</div>
                            </div>
                            <div className="tweet-body">{item.content.body}</div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
