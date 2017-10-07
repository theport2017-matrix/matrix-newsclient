import moment from 'moment';
import React from 'react';
import WeatherIcons from 'react-weathericons';

import 'weathericons/css/weather-icons.css';

const ICON_MAP = {
  cloudy: 'cloud',
  sunny: 'day-sunny',
  rain: 'rain',
  snow: 'snow'
}

export default class WeatherBox extends React.Component {
  render() {
    const forecast = this.props.data.map((day) => {
      const dt = moment(day.datestamp);
      return {
        weekDay: dt.calendar(null, {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          sameWeek: 'ddd',
          nextWeek: 'ddd',
        }),
        timestamp: dt,
        className: ICON_MAP[day.type],
        temperature: day.temperature
      };
    }).sort((d1, d2) => d1.timestamp.subtract(d2));
    return (
      <ul className="weather-box">
        {forecast.map((day) => (
          <li className="day">
            <span class="icon">
              <WeatherIcons name={day.className} />
            </span>
            <span class="temperature">
              {day.temperature}
              <span class="unit">C</span>
            </span>
            <span class="timestamp">{day.weekDay}</span>
          </li>
        ))}
      </ul>
    );
  }
}
