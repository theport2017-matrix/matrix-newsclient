import React from 'react';

export default class AnnouncementBox extends React.Component {
    render() {
        const announcements = this.props.announcements;
        return (
            <div className="announcement-box">
            <h2>
            <img src="data:image/png;base64,R0lGODlhGAAUAHcAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJZAAAACwAAAAAGAAUAIAAAAAxMTECQIyPacANCpFrsU527syXa7x04feMjvehlKmpYPCabgnTMvvGdS7WyYmj6YA7Iom3CRp7RyHzOKtEWlIFtSq5FAAAIfkECQoAAAAsAAAAABQAFACAAAAAMTExAjmMj2nA6sjAm/HEe21bGGvJdVX4iWAwoubGaUnmtlCqxuVsh2ct3/bK4qlWn5KoqDuSJg4aE/mcAQoAIfkECQoAAAAsAAAAABUAFACAAAAAMTExAj6Mj2nAoI+ag1AeiVnUK9vLBd7XTeIYOilqqq1ZtieYkNpbNzS+rSLdk61Ql1nMUxyOeiBik0LRQRWkaRNQAAAh+QQJCgAAACwAAAAAFgAUAIAAAAAxMTECQoyPacCsj5qDUIJjMw4NZ7l1yydy12SS12h6qteyUdmtsWvX8IzqMu7i7ICjE+4D66lyJ+aLpXwKS5RE01blobLHAgAh+QQJCgAAACwAAAAAFwAUAIAAAAAxMTECRIyPacCtj5qDULJjMw4S575Y3neFXHmSwDil5Hh6CZjGZtR26832u90LXX4oIXF4VMFQKqbI+JHlmqwiJeK6PjTamaUAACH5BAkKAAAALAAAAAAXABQAgAAAADExMQI/jI9pwK2PmoNQsmMztjvPoC3eF4LjJUrduIJboqYkAM+fWaPmrcsr/YrYhp4WcMeS6U5LjrJUouRu0t+xai0AADs="/>
            Announcements
            </h2>
              <ul>
                {announcements.filter((msg) => (msg.body != undefined)).map((item, i) => (
                    <li key={i} className={'level-' + item.level}>{item.body}</li>
                ))}
              </ul>
            </div>
        );
    }
}
