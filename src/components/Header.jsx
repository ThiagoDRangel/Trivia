import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../images/logo.jpg';
import star from '../images/star.png';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { player: { name, gravatarEmail, score } } = this.props;
    const EmailOfGravatar = md5(gravatarEmail).toString();
    const urlImage = `https://www.gravatar.com/avatar/${EmailOfGravatar}`;
    return (
      <div className="header-container">
        <header>
          <img src={ logo } alt="logo" className="logo-trivia" />
        </header>
        <main>
          <div className="user-container">
            <img
              src={ urlImage }
              alt="profile"
              data-testid="header-profile-picture"
              className="user-image"
            />
            <p className="player-name" data-testid="header-player-name">{ name }</p>
          </div>
          <div className="score-container">
            <img className="score-star" src={ star } alt="estrela-score" />
            <p className="score" data-testid="header-score">
              Pontos:
              {' '}
              { score }
            </p>
          </div>
        </main>
      </div>
    );
  }
}

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Header);