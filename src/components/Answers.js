import React, { Component } from 'react';

class Answers extends Component {
  render() {
    return (
      <div className="results-display">
        <div>True: {this.props.answers.filter(a => a.answer === 'true').length}</div>
        <div>False: {this.props.answers.filter(a => a.answer === 'false').length} </div>
      </div>
    );
  }
}

export default Answers;