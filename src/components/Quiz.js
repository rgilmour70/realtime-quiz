import React, { Component } from 'react';

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

    return (
      <div className="q-and-a">
        <p className="question-text">{this.state.question.text}</p>
        <form onSubmit={this.addAnswer} className="answer-form">
          {
            this.props.question.answers.map(a => 
              <div className="form-check" key={a.answerId}>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name={`q${this.state.question.id}`}
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

export default Quiz;