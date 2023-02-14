import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import trivia from '../images/logo.jpg';

class Settings extends Component {
  render() {
    const { history } = this.props;
    return (
      <main className="settings">
        <section className="settings-form">
          <img alt="trivia" src={ trivia} />
          <h1 className="settings-title">Configurações</h1>
          <select
            className="categories-select"
            defaultValue="Categoria"
            id="categories"
            name="categories"
          >
            <option value="Categoria" disabled hidden>Categoria</option>
            <option value="movie">Movie</option>
            <option value="cars">Cars</option>
            <option value="food">Food</option>
          </select>
          <select name="difficulty" id="difficulty" required defaultValue="Dificuldade">
            <option value="Dificuldade" disabled hidden>Dificuldade</option>
            <option value="easy">Fácil</option>
            <option value="medium">Moderado</option>
            <option value="difficult">Difícil</option>
          </select>
          <select name="type" id="type" required defaultValue="Tipo">
            <option value="Tipo" disabled hidden>Tipo</option>
            <option value="easy">Fácil</option>
            <option value="medium">Moderado</option>
            <option value="difficult">Difícil</option>
          </select>  
        <Button
          customClass="settingsPlayButton"
          handleClick={ () => { history.push('/'); } }
          text="PLAY"
        />
        </section>
      </main>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Settings;


