import React from 'react';

export default class EmergencyOverlay extends React.Component {
  render() {
    if (!this.props.message) {
      return null;
    }

    setTimeout(() => {
      this.element.style.display = 'none';
    }, 5000);

    return (
      <div className="emergency-overlay" ref={(element) => { this.element = element; }}>
        {this.props.message}
      </div>
    );
  }
}
