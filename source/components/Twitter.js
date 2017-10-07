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
            <div id="tweet-feed" className="tweets-box">
                <h1>Tweet Feed</h1>
                <ul>
                    {tweets.filter((item) => (item.content.body != undefined)).map((item, i) => (
                        <li key={i}>{item.sender}: {item.content.body}</li>
                    ))}
                </ul>
            </div>
        );
    }
}
