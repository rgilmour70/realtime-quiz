// eslint-disable-next-line
import React, { Component } from 'react';
import ReactWordCloud from 'react-wordcloud';

class TextAnswer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionText: this.props.question.text,
      questionId: this.props.question.id,
      userAnswers: this.props.userAnswers,
      words: [],
    };
  }


  handleWordEntry = (e) => {
    e.preventDefault();
    const w = e.currentTarget[0].value.toLowerCase().trim();
    e.currentTarget[0].value = '';

    let newWordObj = {'text': w, 'value': 1};

    const currentWords = this.state.words;

    let wordAlreadyPresent = false;

    for (let wordObj of currentWords) {
      if (wordObj.text.toLowerCase() === w) {
        wordAlreadyPresent = true;
        const i = currentWords.indexOf(wordObj);
        let prevValue  = wordObj.value;
        if (i > -1) {
          currentWords.splice(i, 1);
        }
        newWordObj = {'text': w, 'value': prevValue+=1};
        currentWords.push(newWordObj);
        break;
      }
    }

    if (!wordAlreadyPresent) {
      currentWords.push(newWordObj);
    }

    this.setState({words: currentWords});

    const channelName = this.props.channelName;

    /*global Ably*/
    const channel = Ably.channels.get(channelName);
    channel.publish('add_answer', this.state.words, err => {
      if (err) {
        console.log('Unable to publish message; err = ' + err.message);
      }
    });
  }

  render() {
    return (
      <div className="q-and-a">
        <p className="question-text">{this.state.questionText}</p>
        <form onSubmit={this.handleWordEntry} className="form-inline">
          <div className="form-row">
            <input type="text" className="form-control text-answer-box" />
            <button type="submit" className="btn btn-primary ml-2">Enter</button>
          </div>
        </form>
        <ReactWordCloud
          options={{
            rotations: 0,
            colors: ['#4682b4', '#ff8c42', '#ff3c38', '#a23e48'],
            fontSizes: [16, 36],
            fontFamily: 'sans-serif',
          }}
          words={this.props.userAnswers} 
        />
      </div>
    );
  }
}

export default TextAnswer;
