import React, { Component } from 'react';
import './Day.css';

class Day extends Component {

  render() {
    /* :) 
    const backgroundStyle = {
      backgroundImage: `url('https://source.unsplash.com/500x150/?${this.props.interval.weather[0].description}&sig=${Math.random()}')`
    }
    */
    return (
      <div>
        <div className="row">
          <div className="small-10 small-centered column">
            <div className="forecast-container">
              <h4>{this.props.interval.dt_txt}</h4>
              <div className="row collapse">
                <div className="small-2 medium-3 column weather-icon">
                  <i className={`owf owf-${this.props.interval.weather[0].id}`} />
                </div>
                <div className="small-10 medium-9 column">
                  {this.props.interval.main.temp} &deg; Celcius
                  <br />
                  {this.props.interval.main.temp * 9 / 5 + 32} &deg; Fahrenheit
                  <br />
                  {/* Highest {this.props.interval.main.temp_max} &deg; C
                  <br />
                  Lowest {this.props.interval.main.temp_min} &deg; C
                  <br /> */}
                  {this.props.interval.weather[0].description}
                  <br />
                  Wind speed {this.props.interval.wind.speed} m/s
                  <br />
                  Humidity {this.props.interval.main.humidity} %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Day;
