import React from 'react';

import sirenWavUrl from '../siren.wav';

export default class EmergencyOverlay extends React.Component {

  constructor() {
    super();
    this.state = {
      flash: true,
    }

    document.getElementById('audio').src = sirenWavUrl;
    document.getElementById('audio').play();
  }

  componentWillMount() {
    setInterval(() => {
      this.setState({
        flash: !this.state.flash
      })
    }, 500);
    setTimeout(() => {
      this.element.style.display = 'none';
    }, 10000);
  }

  render() {
    if (!this.props.message) {
      return null;
    }

    return (
      <div className="emergency-overlay" ref={(element) => { this.element = element; }}>
        { this.state.flash ? this.props.message : ""}
      </div>
    );
  }
}
