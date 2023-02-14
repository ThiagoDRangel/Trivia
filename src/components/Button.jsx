import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {

  render() {
    const {
      customClass,
      disabled,
      handleClick,
      image,
      text,
      type,
    } = this.props;
    return (
      <button
        className={ customClass }
        disabled={ disabled }
        onClick={ handleClick }
        type={ type }
      >
        {text}
        {image && <img src={ image } width="100%" alt="ícone" /> }
      </button>
    );
  }
}

Button.propTypes = {
  customClass: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  image: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  customClass: undefined,
  disabled: false,
  image: '',
  text: '',
  type: 'button',
}

export default Button;
