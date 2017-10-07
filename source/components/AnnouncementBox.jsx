import React from 'react';

export default class AnnouncementBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            announcements: []
        }
    }

    addMessage(content) {
        this.setState({announcements: this.state.announcements.concat([content])});
    }

    render() {
        const announcements = this.state.announcements;
        return (
            <div className="announcement-box">
              <h3>Announcements</h3>
              <ul>
                {announcements.map((item, i) => (
                    <li key={i} className={'level-' + item.level}>{item.body}</li>
                ))}
              </ul>
            </div>
        );
    }
}
