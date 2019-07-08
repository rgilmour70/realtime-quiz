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
      question: getSelectedContent(),
      questionId: 0,
      channelName: '',
    }
  }

  componentDidMount() {

    // Determine question id and add to state
    const questionId = this.state.question.id;
    this.setState({questionId});

    // Make channel name based on questionId
    // Add this to state
    const channelName = `ch_${questionId}`;
    this.setState({channelName});

    // Determine question type and add to state
    const type = this.state.question.type;
    this.setState({type});


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

    } else if (this.state.question.type === 'multipleChoice' || this.state.question.type === 'trueFalse') {

      this.setState({ answers: this.state.question.answers });
    }

    // Subscribe to Ably channel
    /*global Ably*/
    const channel = Ably.channels.get(channelName);

    channel.attach();
    channel.once('attached', () => {
      channel.history((err, page) => {
        // create a new array with answers from users
        const userAnswers = Array.from(page.items, item => item.data)

        this.setState({ userAnswers });

        // from Tom at Ably
        channel.subscribe((msg) => {
          const answerString = msg.data;
          this.handleAddAnswer(answerString);
        })
      });
    });
  }

  handleAddAnswer = (userAnswer) => {
    if (Array.isArray(userAnswer)) {
      this.setState(prevState => {
        return { 
          userAnswers: userAnswer 
        };
      });
    } else {
      this.setState(prevState => {
        return {
          userAnswers: prevState.userAnswers.concat(userAnswer)
        };
      });
    }
  }

  render() {
    if (this.state.question.type !== 'textAnswer') {
      return (
        <div className="container main">
          <Quiz {...this.state} />
          <AnswersChart {...this.state} />
        </div>
      );
    }
    return (
      <div className="container main">
        <Quiz {...this.state} />
      </div>
    );
  }

}

export default App;