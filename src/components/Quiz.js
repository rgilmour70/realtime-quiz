import React, { Component } from 'react';
import MultipleChoice from './MultipleChoice';
import Range from './Range';

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      type: this.props.question.type
    }
    this.addAnswer = this.addAnswer.bind(this);
  }

  addAnswer(e) {

    e.preventDefault();

    // Get the value of the answer
    const answer = e.target.elements.q1.value.trim();

    // Make sure name boxes are filled
    if (answer) {
      const answerObject = { answer };

      // Publish answer
      /*global Ably*/
      const channel = Ably.channels.get('answers');
      channel.publish('add_answer', answerObject, err => {
        if (err) {
          console.log('Unable to publish message; err = ' + err.message);
        }
      });

    }
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