import React, { Component } from 'react';
import Quiz from './Quiz';
import Answers from './Answers';

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
  }

  handleAddAnswer(answer) {
    this.setState(prevState => {
      return {
        answers: prevState.answers.concat(answer)
      };
    });
  }

  getUrlVars() {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) => { vars[key] = value });
    return vars;
  }


  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <Quiz handleAddAnswer={this.handleAddAnswer} />
              <Answers answers={this.state.answers} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;