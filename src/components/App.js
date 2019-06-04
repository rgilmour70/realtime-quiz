import React, { Component } from 'react';
import Quiz from './Quiz';
import Answers from './Answers';
import { getSelectedContent } from '../utils/dataService';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.state = {
      answers: [],
      activityNumber: 0,
    }
  }

  componentDidMount() {
    /*global Ably*/
    const channel = Ably.channels.get('answers');

    channel.attach();
    channel.once('attached', () => {
      channel.history((err, page) => {
        // create a new array with answers from users
        const answers = Array.from(page.items, item => item.data)

        this.setState({ answers });

        // from Tom at Ably
        channel.subscribe((msg) => {
          const answerObject = msg['data'];
          this.handleAddAnswer(answerObject);
        })
      });
    });

    const question = getSelectedContent();
    console.log(question);
    
  }

  handleAddAnswer(answer) {
    this.setState(prevState => {
      return {
        answers: prevState.answers.concat(answer)
      };
    });
  }

  render() {
    return (
      <div className="container">
        <Quiz handleAddAnswer={this.handleAddAnswer} activityNumber={this.state.activityNumber} />
        <Answers answers={this.state.answers} />
      </div>
    );
  }
}

export default App;