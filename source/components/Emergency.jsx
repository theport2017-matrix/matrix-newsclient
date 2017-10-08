import React from 'react';


export default class EmergencyOverlay extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
  }

  render() {
    if (!this.props.message) {
      return null;
    }

    return (
      <div className="emergency-overlay">
        {this.props.message}
      </div>
    );
  }
}
