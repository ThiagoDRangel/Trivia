import React, { Component } from 'react';
import PropTypes from 'prop-types';
import timerIcon from '../images/timer.png';

class Timer extends Component {
  state = {
    second: 30,
  };

  componentDidMount() {
    const SECOND = 1000;
    const { setTimeOut } = this.props;

    this.play = setInterval(() => {
      this.setState((prev) => ({
        second: prev.second -1,
      }), () => {
        const { second } = this.state;
        setTimeOut(second);
      });
    }, SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  clearTimer = () => {
    const { isTimedOut } = this.props;
    const { second } = this.state;

    if (isTimedOut || second === 0) {
      clearInterval(this.interval);
    }
  };

  render() {
    const { second } = this.state;
    return (
      <main className="question-timer">
        <img alt="cronometro" src={ timerIcon } />
        {`Tempo: ${second}`}
      </main>
    );
  }
}

Timer.propTypes = {
  isTimeOut: PropTypes.bool,
  setTimeOut: PropTypes.func,
}.isRequired;

export default Timer;

