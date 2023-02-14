import React, { Component } from 'react';
import PropTypes from 'prop-types';
import timerIcon from '../images/timer.png';

class Timer extends Component {
  state = {
    isClear: false,
    seconds: 30,
  };

  componentDidMount() {
    const SECOND = 1000;
    const { isSetTimeOut } = this.props;

    this.interval = setInterval(() => {
      this.setState((prev) => ({
        seconds: prev.seconds -1,
      }), () => {
        const { seconds } = this.state;
        isSetTimeOut(seconds);
      });
    }, SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  clearTimer = () => {
    const { isTimeOut } = this.props;
    const { isClear, seconds } = this.state;

    if ((isTimeOut || seconds === 0) && !isClear) {
      clearInterval(this.interval);
    }
  };

  render() {
    const { seconds } = this.state;
    this.clearTimer();
    return (
      <main className="question-timer">
        <img alt="cronometro" src={ timerIcon } />
        {`Tempo: ${seconds}`}
      </main>
    );
  }
}

Timer.propTypes = {
  isTimeOut: PropTypes.bool,
  isSetTimeOut: PropTypes.func,
}.isRequired;

export default Timer;

