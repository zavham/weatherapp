import React, { Component } from 'react';
import Day from '../Day/Day';

import './Form.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      weather: [],
      forecast: [],
      sun: [],
      main: [],
      wind: []
    }
  }

  handleErrors(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }

  groupBy(array, property) {
    return array.reduce(function (groups, item) {
      const interval = groups[property];
      groups[interval] = groups[interval] || [];
      groups[interval].push(interval);
      return groups;
    });
  }
  componentDidMount() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction.bind(this));
    } else {
      alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
    }

    function successFunction(position) {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      console.log('Your latitude is :' + this.lat + ' and longitude is ' + this.long);
    }

    function getDateTimeFromTimestamp(unixTimeStamp) {
      var date = new Date(unixTimeStamp);
      return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    }

    var myTime = getDateTimeFromTimestamp(1519193168);
    console.log(myTime); // output 01/05/2000 11:00
  }

  onFormSubmit(e) {
    e.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&APPID=10615a3cff0d9f3ad9f1cd6a296c9d2a&units=metric`)
      .then(this.handleErrors)
      .then(res => res.json())
      .then(res => {
        let dtSunrise = new Date(res.sys.sunrise * 1000);
        let sunrise =
          dtSunrise.getHours() +
          ":" +
          ("0" + dtSunrise.getMinutes()).substr(-2) +
          ":" +
          ("0" + dtSunrise.getSeconds()).substr(-2);
        let dtSunset = new Date(res.sys.sunset * 1000);
        let sunset =
          dtSunset.getHours() +
          ":" +
          ("0" + dtSunset.getMinutes()).substr(-2) +
          ":" +
          ("0" + dtSunset.getSeconds()).substr(-2);
        this.setState({
          weather: res.weather,
          sun: {
            sunrise: sunrise,
            sunset: sunset
          },
          main: res.main,
          wind: res.wind

        }, function () {
          console.log(this.state.weather, this.state.sun);
        })
      })
      .catch(function (error) {
        console.log(error);
      });

    fetch(`https://api.openweathermap.org/data/2.5/forecast/?lat=${this.lat}&lon=${this.long}&APPID=10615a3cff0d9f3ad9f1cd6a296c9d2a&units=metric`)
      .then(this.handleErrors)
      .then(res => res.json())
      .then(res => {
        this.setState({
          forecast: res.list
        }, function () {
          // forecast is now here
          console.log(this.state.forecast)
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <form className="App-search" onSubmit={this.onFormSubmit.bind(this)}>
          <fieldset>
            {/* <input type="text" placeholder="City name here" id="cityField" /> */}
            <button className="button button-primary" type="submit">Get Weather</button>
          </fieldset>
        </form>
        {this.state.weather && this.state.weather.length > 0 ?
          <div className="App-weather">
            <img src={`http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`} title="weather icon" alt="A weather icon, describing the weather" />
            <p>
              Current weather in your location
              <br />
              {this.state.weather[0].description}
              <br />
              Temperature: {this.state.main.temp}&deg; Celcius
              <br />
              {this.state.main.temp * 9 / 5 + 32} &deg; Fahrenheit
              <br />
              Humidity: {this.state.main.humidity} %
              <br />
              Wind Speed: {this.state.wind.speed} m/s
              <br />
              Sunrise: {this.state.sun.sunrise}
              <br />
              Sunset: {this.state.sun.sunset}
            </p>
          </div>
          : <p>Search after weather in your location</p>
        }
        {this.state.forecast && this.state.forecast.length > 0 ?
          <div className="App-forecast">
            {
              this.state.forecast.map((interval, index) => {
                return <Day key={index} interval={interval} />
              })
            }
          </div>
          : ''
        }
      </div>
    );
  }
}

export default Form;