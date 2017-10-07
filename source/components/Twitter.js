import React from 'react';

export default class Twitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        }
    }

    addTweet(event) {
        var tweet = {sender: event.getSender(), content: event.getContent()};
        this.setState({tweets: this.state.tweets.concat([tweet])});
    }

    render() {
        const tweets = this.state.tweets;
        return (
            <div>
                <h2>Tweet Feed</h2>
                <ul className="twitter-feed">
                    {tweets.filter((item) => (item.content.body != undefined)).map((item, i) => (
                        <li className="tweet" key={i}>
                            <div className="tweet-sender">{item.sender}</div>
                            <div className="tweet-body">{item.content.body}</div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
