import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Settings.css';

class Settings extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };
  render() {
    return (
      <main className="settings">
        <h1> Configurações </h1>
        <button
          type="button"
          className="settings-title"
          onClick={ this.handleClick }
        >
          Início
        </button>
      </main>
    );
  }
}
export default connect()(Settings);