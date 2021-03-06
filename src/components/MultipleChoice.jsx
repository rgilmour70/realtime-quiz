// eslint-disable-next-line
import React, { Component } from 'react';

class MultipleChoice extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
  		questionText: this.props.question.text,
  		questionId: this.props.question.id,
  	};
  }

  handleMcAnswer = (e) => {
    e.preventDefault();
    const q = 'q'+this.state.questionId;
    const userAnswer = e.currentTarget.elements[q].value.trim();
    const channelName = this.props.channelName;

    /*global Ably*/
    const channel = Ably.channels.get(channelName);
    channel.publish('add_answer', userAnswer, err => {
      if (err) {
        console.log('Unable to publish message; err = ' + err.message);
      }
    });
  }

  render() {
    return (
      <div className="q-and-a">
        <p className="question-text">{this.state.questionText}</p>
        <form onSubmit={this.handleMcAnswer} className="answer-form">
          {
            this.props.question.answers.map(a => 
              <div className="form-check" key={a.answerId}>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name={`q${this.state.questionId}`}
                  value={a.answerId}
                  id={`a${a.answerId}`}
                />
                <label className="form-check-label" htmlFor={`a${a.answerId}`}>{a.text}</label>
              </div>
            )
          }
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }

}

export default MultipleChoice;