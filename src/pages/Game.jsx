import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import fetchApi from '../helpers/fetchApi';
import { urlToken } from '../helpers/urls';

class Game extends Component {
  state = {
    selectedQuestion: 0,
    questions: [],
    randomQuestions: [],
  };

  componentDidMount() {
    this.handleToken();
  }

  shuffle = (array) => {
    const NUMBER = 0.5;
    return array.sort(() => Math.random() - NUMBER);
  };

  randomQuestions = (question) => {
    const correctAnswer = {
      class: 'correctAnswer',
      name: question.correct_answer,
      value: true,
    };
    const incorrectAnswers = question.incorrect_answers
      .map((question, index) => ({
        class: 'wrongAnswer',
        index,
        name: question,
        value: false,
      }),
    );
    const alternatives = [correctAnswer, ...incorrectAnswers];
    this.setState({
      randomQuestions: this.shuffle(alternatives),
    });
  };

  handleToken = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const API_ERROR = 3;
    const data = await fetchApi(
      `${urlToken}amount=5&token=${token}`);
    
    switch(data) {
      case API_ERROR:
        localStorage.removeItem('token');
        history.push('/');
        break;
      default:
        console.log('Está funcionando');
    }
    this.setState({
      questions: data.results,
    }, () => {
      const { questions, selectedQuestion } = this.state;
      this.randomQuestions(questions[selectedQuestion]);
    });
  };

  handleNext = () => {
    const { questions, selectedQuestion: curr } = this.state;
    const MAX_QUESTIONS = 4;

    if (curr < MAX_QUESTIONS) {
      this.setState(
        ({ selectedQuestion }) => ({
          selectedQuestion: selectedQuestion + 1,
        }), () => {
          const { selectedQuestion } = this.state;
          this.randomQuestions(questions[selectedQuestion]);
        },
      );
    } else {
      const { history, player } = this.props;
      const ranking = JSON.parse(localStorage.getItem('ranking') ?? '[]');
      ranking.push(player);
      localStorage.setItem('ranking', JSON.stringify(ranking));
      history.push('/feedback');
    }
  };

  render() {
    const { history } = this.props;
    const { questions, selectedQuestion, randomQuestions } = this.state;

    return (
      <main className="game">
        <Header history={ history } />
        {questions.length && (
          <Question
            key={ selectedQuestion }
            question={ questions[selectedQuestion] }
            handleNext={ this.handleNext }
            randomQuestions={ randomQuestions }
          />
        )}
        <footer />
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ player }) => ({
  player,
});

export default connect(mapStateToProps)(Game);


