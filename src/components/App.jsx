import React, { Component } from 'react';
import Quiz from './Quiz';
import AnswersChart from './AnswersChart';
import { getSelectedContent } from '../utils/dataService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswers: [],
      answers: [],
      question: getSelectedContent()
    }
  }

  componentDidMount() {

    // Populate answers (i.e., possible answers) based
    // on question type
    if (this.state.question.type === 'range') {

      let answersFromRange = [];
      for (const k in this.state.question.scale) {
        answersFromRange.push(parseInt(k));
        answersFromRange.sort((a, b) => a - b);
      } 
      const min = answersFromRange[0];
      const max = answersFromRange[answersFromRange.length-1];
      answersFromRange = [];
      for (let i=min; i<=max; i++) {
        answersFromRange.push({answerId:i});
      }
      this.setState({ answers: answersFromRange });

    } else if (this.state.question.type === 'multipleChoice') {

      this.setState({ answers: this.state.question.answers });
    }

    // Subscribe to Ably channel
    /*global Ably*/
    const channel = Ably.channels.get('answers');

    channel.attach();
    channel.once('attached', () => {
      channel.history((err, page) => {
        // create a new array with answers from users
        const userAnswers = Array.from(page.items, item => item.data)

        this.setState({ userAnswers });

        // from Tom at Ably
        channel.subscribe((msg) => {
          const answerObject = msg['data'];
          this.handleAddAnswer(answerObject);
        })
      });
    });
  }

  handleAddAnswer = (userAnswer) => {
    // expects a string
    if (typeof userAnswer !== 'string') {
      console.log('handleAddAnswer() wants a string');
    } else {
      this.setState(prevState => {
        return {
          userAnswers: prevState.userAnswers.concat(userAnswer)
        };
      });
    }
  }

  render() {
    return (
      <div className="container main">
        <Quiz addAnswer={this.addAnswer} {...this.state} />
        <AnswersChart {...this.state} />
      </div>
    );
  }
}

export default App;