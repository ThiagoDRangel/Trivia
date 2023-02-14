import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  checkEmail,
  checkName
} from '../helpers/validation';
import Input from '../components/Input';
import Button from '../components/Button';
import { loginRequest } from '../redux/actions/player';
import logo from '../images/logo.jpg';
import config from '../images/config.png';

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

  handleClick = () => {
    const { name, email } = this.state;
    const { history: { push }, dispatch } = this.props;
    dispatch(loginRequest(name, email, push));
  }

  render() {
    const { name, email, isDisabled } = this.state;
    const { history: { push } } = this.props;
    return (
      <main className="login">
        <img alt="Ícone" className="triviaIcon" src={ logo } />
        
        <form className="formLogin">

          <Button
            customClass="buttonConfig"
            handleClick={ () => push('/settings') }
            image={ config }
          />
          <Input
            name="name"
            placeholder="Digite o seu nome"
            handleChange={ this.handleChange }
            type="name"
            value={ name }
          />
          <Input
            name="email"
            placeholder="Digite seu melhor e-mail"
            handleChange={ this.handleChange }
            type="email"
            value={ email }
          />
          <Button
            customClass="buttonLogin"
            disabled={ isDisabled }
            handleClick={ this.handleClick }
            text="Play"
          />
        </form>
      </main>
    );
  }
}

export default connect()(Login);
