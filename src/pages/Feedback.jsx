import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  yourRank = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const minNumberOfAnswers = 3;
    return (
      <main className="main-feedback">
        <Header />
        <main className="container-feedback">
          <p className="message" data-testid="feedback-text">
            {assertions < minNumberOfAnswers ? 'Tente outra vez!'
              : 'Muito Bem!'}
          </p>

          <p className="score-total" data-testid="feedback-total-score">
            {`Você fez ${score} pontos`}
          </p>
          <p className="assertions" data-testid="feedback-total-question">
            {`${assertions} acertos!`}
          </p>
        </main>
        <div className="btn-container">
          <button
            onClick={ this.playAgain }
            data-testid="btn-play-again"
            className="play-again"
            type="button"
          >
            Jogar novamente
          </button>
          <button
            onClick={ this.yourRank }
            data-testid="btn-ranking"
            className="ranking"
            type="button"
          >
            Ranking
          </button>
        </div>
      </main>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,

};

const mapStateToProps = ({ player }) => ({
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);