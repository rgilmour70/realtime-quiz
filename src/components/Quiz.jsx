import React, { Component } from 'react';
import MultipleChoice from './MultipleChoice';
import Range from './Range';

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      type: this.props.question.type,
      scale: this.props.question.scale,
      answers: this.props.answers,
    }
    this.addAnswer = this.props.addAnswer.bind(this);
  }

  render() {
    if (this.state.type === 'multipleChoice') {
      return (
        <MultipleChoice {...this.state} addAnswer={this.addAnswer} />
      );
    } else if (this.state.type === 'range') {
      return (
        <Range {...this.state} addAnswer={this.addAnswer} />
      );
    }
  }

}

export default Quiz;