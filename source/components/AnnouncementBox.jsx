import React from 'react';

export default class AnnouncementBox extends React.Component {
    render() {
        const announcements = this.props.announcements;
        return (
            <div className="announcement-box">
            <h2>Announcements</h2>
              <ul>
                {announcements.filter((msg) => (msg.body != undefined)).map((item, i) => (
                    <li key={i} className={'level-' + item.level}>{item.body}</li>
                ))}
              </ul>
            </div>
        );
    }
}
