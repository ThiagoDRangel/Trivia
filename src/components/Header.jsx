import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import config from '../images/config.png';

class Header extends Component {
  render() {
    const { history: { push }, user: { image, name } } = this.props;
    const score = JSON.parse(localStorage
      .getItem('playeer') ?? '{}').score ?? 0;
    return (
      <header>
        <img
          alt="avatar"
          src={ image }
        />
        <p>{ name }</p>
        <p>{ score }</p>
        <nav>
          <Button
            handleClick={ () => push('/settings') }
            image={ config }
        />
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  user: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Header);