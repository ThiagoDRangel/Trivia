import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
// import { decode } from 'he';

class QuestionCard extends Component {
  random = (questions) => {
    const NUMBER = 0.5;
    return questions.sort(() => Math.random() - NUMBER);
  };

  randomQuestions = () => {
    const { question: { true_Questions, false_Questions } } = this.props;

    const trueQuestions = (
      <Button
        className="true-questions"
        handleClick={ '' }
        key={ true_Questions }
        text={ true_Questions }
      />
    );

    const falseQuestions = false_Questions.map((alternative, index) => (
      <Button
        className="false-questions"
        handleClick=""
        key={ alternative }
        text={ alternative }
      />
    ));

    const alternatives = [trueQuestions, ...falseQuestions];
    return this.random(alternatives);
  };

  render() {
    const {question: { category, question } } = this.props;
    const randomQuestions = this.randomQuestions();

    return (
      <main>
        <section>
          {category}
        </section>
        <section>
          {question}
        </section>
        <section>
          {randomQuestions.map((question) => question)}
        </section>
      </main>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.shape({}),
}.isRequired;

export default QuestionCard;

