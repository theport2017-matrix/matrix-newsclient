import React from 'react';

const ANNOUNCEMENT_CHANGE_DELAY = 10000;

export default class AnnouncementBox extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        message: {
            level: 'info',
            body: 'Loading...'
        }
      };
  }

  componentDidMount() {
    let index = 0;

    setInterval(() => {
      // filter out redacted messages
      const announcements = this.props.announcements.filter((elem) => elem.body != null);

      if (index >= announcements.length) {
        index = 0;
      }

      this.setState({
        message: announcements[index]
      })
      index = (index + 1) % announcements.length;
    }, ANNOUNCEMENT_CHANGE_DELAY);
  }

  render() {
    return (
        <div className={'announcement-box level-' + this.state.message.level}>
            <span>{this.state.message.body}</span>
        </div>
    );
  }
}
