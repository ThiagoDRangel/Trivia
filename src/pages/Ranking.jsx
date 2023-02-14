import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../components/Button';
import trivia from '../images/logo.jpg';

class Ranking extends Component {
  state = {
    playerRanking: [],
  };

  componentDidMount() {
    const playerRanking = JSON.parse(localStorage.getItem('ranking') ?? '[]');
    playerRanking.sort((a, b) => b.score - a.score);
    this.setState({
      playerRanking,
    });
  }

  render() {
    const { history } = this.props;
    const { playerRanking } = this.state;
    return (
      <main className="ranking">
        <section className="ranking-form">
          <img alt="trivia" src={ trivia } />
          <h1 className="ranking-title">Ranking</h1>
          <ol>
            {
              playerRanking.map(({player: { name, score, image }}, index) => (
                <li key={ `${name}-${score}` }>
                  <img alt={name} src={image} />
                  Jogador:
                  <span className="player-name">
                    {name}
                  </span>
                  Pontuação:
                  <span className="player-score">
                    {score}
                  </span>
                </li>
              ))
            }
          </ol>
          <Button
            customClass="rankingPlayButton"
            handleClick={ () => history.push('/') }
            text="Play Again"
            type="button"
          />
        </section>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);


