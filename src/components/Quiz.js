import React, { Component } from 'react';

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.addAnswer = this.addAnswer.bind(this);
  }

  addAnswer(e) {

    e.preventDefault();

    // Get the value of the anwer
    const answer = e.target.elements.q1.value.trim();
    console.log(answer);

    // Make sure name and answer boxes are filled
    if (answer) {
      const answerObject = { answer };

      // this.props.handleAddComment(answerObject);

      // Publish answer
      /*global Ably*/
      const channel = Ably.channels.get('answers');
      channel.publish('add_answer', answerObject, err => {
        if (err) {
          console.log('Unable to publish message; err = ' + err.message);
        }
      });

      // Clear input fields
      // e.target.elements.answer.value = '';
      // e.target.elements.name.value = '';
    }
  }

  render() {

    return (
      <div>
        <p className="question">Puppies are cute. (T/F)</p>
        <form onSubmit={this.addAnswer}>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="q1" id="inlineRadio1" value="true" />
            <label className="form-check-label" htmlFor="inlineRadio1">True</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="q1" id="inlineRadio2" value="false" />
            <label className="form-check-label" htmlFor="inlineRadio2">False</label>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
    );
  }
}

export default Quiz;