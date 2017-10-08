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
    }).filter((d) => d.timestamp.diff(moment().startOf('day'), 'seconds') >= 0)
      .sort((d1, d2) => d1.timestamp.subtract(d2));
    return (
      <ul className="weather-box">
        {forecast.map((day, index) => (
          <li key={index} className="weather-day">
            <span className="icon">
              <WeatherIcons name={day.className} />
            </span>
            <br/>
            <span className="temperature">
              {day.temperature}
              <span className="unit">°C</span>
            </span>
            <br/>
            {index>0?<span className="timestamp">{day.weekDay}</span>:null}
          </li>
        ))}
      </ul>
    );
  }
}
