// eslint-disable-next-line
import React, { Component } from 'react';
import Slider from 'react-rangeslider';

class Range extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderValue : 0,
      questionId : this.props.id,
      minCorrect: this.props.minCorrect,
      scale : this.props.scale,
      answers: this.props.answers,
      questionText: this.props.question.text,
    };
    this.addAnswer = this.props.addAnswer.bind(this);
  }
  
  onFinish = () => {
    this.addAnswer(this.state.sliderValue);
  }

  onMove = (value) => {
    this.setState({ sliderValue: value });
  }

  render() {
    let { sliderValue } = this.state;
    return (
      <div className='slider'>
        <p className="question-text">{this.state.questionText}</p>
        <Slider 
          min={0}
          max={10}
          value={sliderValue}
          onChange={ this.onMove }
          labels={this.state.scale}
        />
        <button className="btn btn-primary" onClick={this.onFinish}>Submit</button>
      </div>
    );
  }
}

export default Range;
