import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import fetchApi from '../helpers/fetchApi';
import { urlToken } from '../helpers/urls';

class Game extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    this.handleToken();
  }

  handleToken = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const API_ERROR = 3;
    const data = await fetchApi(
      `${urlToken}amount=5&token=${token}`);
    
    switch(data) {
      case API_ERROR:
        localStorage.removeItem('token');
        history.push('/');
        break;
      default:
        console.log('Está funcionando');
    }
    this.setState({
      questions: data.results,
    });
  }
  
  render() {
    return (<h1>Game</h1>);
  }
}

export default Game;
