import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const grade = 3;
    const { assertions, history, score } = this.props;
    return (
      <main>
        <Header history={ history } />
        <div>
          <section>
            <h1>Feedback</h1>
            <p>{assertions}</p>
            <p>{score}</p>
            <p>{assertions >= grade ? 'Well Done' : 'Could be better...'}</p>
            <section>
              <button
                type="button"
                onClick={ () => history.push('/ranking') }
              >
                Ranking
              </button>
              <button
                onClick={ () => history.push('/') }
                type="button"
              >
                Play Again
              </button>
            </section>
          </section>
        </div>
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({
  player: { assertions, score }
}) => ({
  assertions,
  score,
});

export default connect(mapStateToProps)(Feedback);

