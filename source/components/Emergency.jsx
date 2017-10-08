import React from 'react';


export default class EmergencyOverlay extends React.Component {

  constructor() {
    super();
    this.state = {
      flash: true,
    }

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
