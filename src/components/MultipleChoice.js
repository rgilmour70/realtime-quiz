// eslint-disable-next-line
import React, { Component } from 'react';

class MultipleChoice extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
  		questionText: this.props.question.text,
  		questionId: this.props.question.id,
  	};
  	this.addAnswer = this.props.addAnswer.bind(this);
  }

  handleMcAnswer = (e) => {
    e.preventDefault();
    const ua = e.currentTarget.elements.q1.value.trim();
    this.addAnswer(ua);
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