import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      handleChange,
      label,
      name,
      placeholder,
      type,
      value,
    } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <input
          id={ name }
          placeholder={ placeholder }
          name={ name }
          onChange={ handleChange }
          type={ type }
          value={ value }
        />
      </label>
    );
  }
}

Input.propTypes = {
  handleChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}.isRequired;

Input.defaultProps = {
  placeholder: '',
};

Input.propTypes = {
  placeholder: PropTypes.string,
};

export default Input;

