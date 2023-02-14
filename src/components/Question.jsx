import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';
import Timer from './Timer';
import totalScore from '../helpers/totalScore';
import { saveScore } from '../redux/actions/player';
import triviaIcon from '../images/logo.jpg';
import trybe from '../images/trybe.png';
import { decode } from 'he';

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

  isSetTimeOut = (seconds) => {
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
    const { handleNext, question, randomQuestions } = this.props;
    const { isAnswerSelected, isTimeOut } = this.state;
    const selected = isAnswerSelected || isTimeOut;
    return (
      <>
        <div className="question">
          <img
            src={ triviaIcon }
            alt="Ícone do Trívia"
            className="triviaIcon"
          />
          <div className="questionBody">
            <div className="questionCategory">
              <h2 data-testid="question-category">{question.category}</h2>
            </div>
            <h3 data-testid="question-text">{decode(question.question)}</h3>
            {!isAnswerSelected && (
              <Timer
                isTimedOut={ isTimeOut }
                setTimedOut={ this.setTimedOut }
              />
            )}
          </div>
          <img
            src={ trybe }
            alt="Ícone da Trybe"
            className="trybeIcon"
          />
        </div>
        <div className="secondary">
          <div
            data-testid="answer-options"
            className="questionAnswers"
          >
            {randomQuestions.map((answer) => (
              <Button
                testId={
                  answer.value ? 'correct-answer' : `wrong-answer-${answer.index}`
                }
                key={ answer.name }
                text={ decode(answer.name) }
                handleClick={ () => this.handleClick(answer.value) }
                customClass={ isAnswerSelected ? answer.class : 'option' }
                disabled={ selected }
              />
            ))}
          </div>
          {selected && (
            <Button
              testId="btn-next"
              handleClick={ handleNext }
              text="Next"
              customClass="buttonNext"
            />
          )}
        </div>
      </>
    );
  }
}

export default connect()(Question);

Question.propTypes = {
  question: PropTypes.shape({}),
}.isRequired;

