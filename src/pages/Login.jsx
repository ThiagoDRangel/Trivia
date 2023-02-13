import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  checkEmail,
  checkName
} from '../helpers/validation';

class Login extends Component {
  state = {
    email: '',
    isDisabled: true,
    name: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { name, email } = this.state;
      this.setState({
        isDisabled: !checkName(name) || !checkEmail(email),
      });
    });
  };
  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <main>
        <input
          id="name"
          name="name"
          placeholder="Nome"
          onChange={ this.handleChange }
          type="text"
          value={ name }
        />
        <input
          id="email"
          name="email"
          placeholder="E-mail"
          onChange={ this.handleChange }
          type="email"
          value={ email }
        />
        <button
          disabled={ isDisabled }
          onClick={ () => {} }
          type="button"
        >
          Play
        </button>
      </main>
    );
  }
}

export default connect()(Login);
