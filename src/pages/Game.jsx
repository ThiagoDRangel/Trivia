/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { actionFetchQuestionsApi, saveScore } from '../redux/actions';
import trivia from '../images/trivia.png';
import '../styles/Game.css';

class Game extends Component {
  state = {
    index: 0,
    classButton: false,
    secondsTimer: 30,
  };

  async componentDidMount() {
    const { dispatch, history } = this.props;
    const token = localStorage.getItem('token');
    const fetch = await dispatch(actionFetchQuestionsApi(token));
    const INVALID_TOKEN = 3;
    if (fetch.response_code === INVALID_TOKEN) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.timer();
    }
  }

  timer = () => {
    const MILLISECONDS = 1000;
    const timerInterval = setInterval(() => {
      const { secondsTimer } = this.state;
      if (secondsTimer > 0) {
        this.setState({ secondsTimer: secondsTimer - 1 });
      }
    }, MILLISECONDS);
    return () => clearInterval(timerInterval);
  };

  difficultyScore = () => {
    const { index } = this.state;
    const { questions } = this.props;
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    switch (questions[index].difficulty) {
    case 'easy':
      return EASY;
    case 'medium':
      return MEDIUM;
    case 'hard':
      return HARD;
    default:
      return 0;
    }
  };

  handleClick = ({ target }) => {
    this.setState({ classButton: true });
    const { questions, dispatch } = this.props;
    const { index } = this.state;
    const POINTS = 10;
    if (target.value === questions[index].correct_answer) {
      const { secondsTimer } = this.state;
      const sum = POINTS + (secondsTimer * this.difficultyScore());
      dispatch(saveScore(sum));
      this.setState({ secondsTimer: 0 });
    } else {
      this.setState({ secondsTimer: 0 });
    }
  };

  verificationClass = (answer) => {
    const { questions } = this.props;
    const { index, classButton, secondsTimer } = this.state;
    if (classButton || secondsTimer === 0) {
      if (questions[index].correct_answer === answer) {
        return 'correct-answer';
      }
      return 'wrong-answer';
    } return '';
  };

  clickNextButton = () => {
    const { history } = this.props;
    const { index } = this.state;
    const QUESTION_MAX = 4;
    if (index < QUESTION_MAX) {
      this.setState({
        index: index + 1,
        secondsTimer: 30,
        classButton: false,
      });
    } else {
      this.setState({
        index: 0,
        classButton: false,
      }, history.push('/feedback'));
    }
  };

  render() {
    const { questions, answersShuffle } = this.props;
    const { index, secondsTimer, classButton } = this.state;
    return (
      <>
        <Header />
        {questions.length > 0 && (
          <div className="container">
            <div className="questions-container">
              <p
                dangerouslySetInnerHTML={ { __html: questions[index].category } }
                data-testid="question-category"
                className="category"
              />
              <p
                dangerouslySetInnerHTML={ { __html: questions[index].question } }
                data-testid="question-text"
                className="question"
              />
              <p className="timer">{`Tempo: ${secondsTimer}`}</p>
            </div>
            <div className="answers-container" data-testid="answer-options">
              <img className="logo-trivia2" alt="logo-trivia" src={ trivia } />
              {answersShuffle[index].map((answer, i) => (
                <button
                  key={ answer }
                  value={ answer }
                  disabled={ secondsTimer === 0 }
                  onClick={ this.handleClick }
                  className={ this.verificationClass(answer) }
                  data-testid={ questions[index]
                    .correct_answer === answer
                    ? 'correct-answer' : `wrong-answer-${i}` }
                >
                  {answer}
                </button>
              ))}
              {(classButton || secondsTimer === 0) && (
                <button
                  type="button"
                  className="next-button"
                  data-testid="btn-next"
                  onClick={ this.clickNextButton }
                >
                  Próxima pergunta
                </button>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

Game.propTypes = {
  answersShuffle: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = ({ game }) => ({
  questions: game.questions,
  answersShuffle: game.answersShuffle,
});

export default connect(mapStateToProps)(Game);