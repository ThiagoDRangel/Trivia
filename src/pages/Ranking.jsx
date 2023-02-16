import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../styles/Ranking.css';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div className="container-ranking">
        <h1 className="text-ranking" data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          className="btn-home"
          onClick={ this.handleClick }
        >
          Início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);