import React from "react";
import { Http } from "../../common/http";
import { weekdays, humanDays } from "../../common/dates";

//get Openweather api from https://openweathermap.org/api
const getWeather = (key, location, units) => {
  const http = new Http();
  const request_url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}&units=${units}`;

  return http.fetch(request_url).then(data => {
    if(typeof data === 'string') {
      data = JSON.parse(data)
    }
    let response = [data.list[1], data.list[9], data.list[17]];
    return response;
  });
};

export class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      weather: []
    };
  }

  componentDidMount() {
    const ns = this.props.store.getState().dashboard.widgets.weather;
    // Who needs error handling?
    this.setState({ location: ns.location.split(',')[0] });

    this.mounted = true;
    if (this.mounted) {
      getWeather(ns.api_key, ns.location, ns.units).then(weatherData => {
        weatherData.map(day => {
          const dayObj = {
            day: new Date(day.dt_txt).getDay() - 1,
            temp: day.main.temp,
            icon: day.weather[0].icon
          };
          this.setState({
            arr: this.state.weather.push(dayObj)
          });
        });
      })
      .catch(error => {
        console.log(`Encountered error: `, error);
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const weatherData = this.state.weather;

    return (
      <div className="widget weather">
        <div className="heading">{this.state.location} Weather</div>

        {weatherData.map((day, index) => (
          <div className="group" key={index}>
            <div className="group-heading">
              {index < 2 ? humanDays[index] : weekdays[day.day]}
            </div>
            <div className="group-content">
              <img
                src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              />
            </div>
            <div className="temp">{Math.round(day.temp)}°</div>
          </div>
        ))}
      </div>
    );
  }
}
