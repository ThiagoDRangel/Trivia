import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';
import Timer from './Timer';
import totalScore from '../helpers/totalScore';
import { saveScore } from '../redux/actions/player';
import triviaIcon from '../images/logo.jpg';
import trybe from '../images/trybe.png';
// import { decode } from 'he';

class Question extends Component {
  state = {
    assertions: 0,
    isAnswerSelected: false,
    isTimeOut: false,
    score: 0,
    time: 30,
  };

  handleClick = (value) => {
    const { question, dispatch } = this.props;

    this.setState((prev) => ({
      assertions: value ? prev.assertions + 1 : prev.assertions,
      isAnswerSelected: true,
      isTimeOut: true,
      score: value ? prev.score + totalScore(
        question, prev.timer) : prev.score,
    }), () => {
      const { assertions, score } = this.state;
      dispatch(saveScore(score, assertions));
    });
  }

  setTimeOut = (seconds) => {
    if (seconds === 0) {
      this.setState({
        isTimeOut: true,
      });
    }
    this.setState({
      time: seconds,
    });
  }

  render() {
    const { handleNext, question: { category, question }, randomQuestions } = this.props;
    const { isAnswerSelected, isTimeOut } = this.state;
    const selected = isAnswerSelected || isTimeOut;
    return (
      <main>
        <section className="question">
          <img
            alt="trivia"
            className="trivia-icon"
            src={ triviaIcon }
          />
        </section>
        <section className="question-body">
          <div className="question-category">
            <h2>{category}</h2>
            <h3>{question} </h3>
            {!isAnswerSelected && (
              <Timer
                isTimeOut={isTimeOut}
                setTimeOut={ this.setTimeOut }
              />
            )}
          </div>
          <img
            alt="icon trybe"
            className="trybe-icon"
            src={ trybe }
          />
        </section>
        <section className="secondary">
          <div clasName="question-answers">
            {randomQuestions.map((question) => (
              <Button
                customClass={ isAnswerSelected ? question.class : 'option' }
                disabled={ selected }
                handleClick={ () => this.handleClick(question.value) }
                key={ question.name }
                text={ question.name }
              />
            ))}
          </div>
          {selected && (
            <Button
              customClass="buttonNext"
              handleClick={ handleNext }
              text="Next"
            />
          )}
        </section>
      </main>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({}),
}.isRequired;

export default connect()(Question);

