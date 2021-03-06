var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;


var DetailView = React.createClass({
  mixins: [Navigation],

  componentDidMount: function() {
    window.setInterval(this.updateTime, 1000);
  },

  getInitialState: function(){
    return {
      result: '',
      solved: false,
      started: new Date(),
      now: new Date()
    };
  },

  updateTime: function() {
    if (!this.state.solved) {
      this.setState({
        now: new Date()
      });
    }
  },

  setRegex: function() {
    var value = React.findDOMNode(this.refs.solutionText).value;
    var solved = this.isSolved(value);
    this.setState({
      result: value,
      solved: solved
    });
  },

  checkTestCase: function(testCase, condition) {
    try {
      var regex = new RegExp(this.state.result);
      return regex.test(testCase) === condition ? 'solved' : 'unsolved';
    } catch(e) {
      return 'unsolved';
    }
  },

  displayTestCases: function(string, condition) {
    var question = this.props.questions[this.props.params.qNumber - 1];
    return question[string].map(function(testCase) {
      return (
        <p key={testCase} className={this.checkTestCase(testCase, condition)}>{testCase}</p>
      )
    }.bind(this));
  },

  calculateTime: function() {
    var t = Math.floor((this.state.now - this.state.started) / 1000);
    var sec = t % 60;
    if(sec.toString().length < 2) {
      sec = '0' + sec;
    }
    var min = Math.floor(t / 60);
    return min + ':' + sec;
  },

  displayTimer: function() {
    return <div>
      {this.calculateTime()}
    </div>;
  },

  updateUser: function(score){
    var question = this.props.questions[this.props.params.qNumber - 1]
    data = {
      username: window.localStorage.getItem('com.TearsOfTheAncients.username'),
      question: {
        title: question.title,
        score: score,
        time: this.calculateTime(),
        answer: this.state.result
      }
    }
    console.log('asdf')
    $.ajax({
      url: window.location.origin + '/endGame',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(data){
        console.log('data', data);
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

  calculateScore: function() {
    var sec = Math.floor((this.state.now - this.state.started) / 1000);
    var strLength = this.state.result.length;
    var score = 1000 - ((strLength + 1) * 5) - Math.floor(sec);
    if(score < 0) {
      score = 0;
    }
    this.updateUser(score);
    return score;
  },

  displayScore: function() {
    return <div>
      Score: {this.calculateScore()}
    </div>;
  },

  returnToMenu: function() {
    this.setState({
      result: '',
      solved: false,
    });

    this.props.goToQuestionMenu();
  },

  isSolved: function(regexString) {
    var question = this.props.questions[this.props.params.qNumber - 1];

    var truthy = question['truthy']
    var falsy = question['falsy'];

    try {
      var regex = new RegExp(regexString);

      var solvedTruthy = truthy.reduce(function(result, current) {
        return result && regex.test(current);
      }, true);

      var solvedFalsy = falsy.reduce(function(result, current) {
        return result && !regex.test(current);
      }, true);

      return solvedTruthy && solvedFalsy;
    } catch(e) {
      return null;
    }
  },

  render: function() {
    var question = this.props.questions[this.props.params.qNumber - 1];

    if (this.props.questions.length > 0 && question === undefined) {
      this.transitionTo('/');
    }

    // makes sure that the questions are loaded from the database before rendering the view
    try {
      question.title;
    } catch(e) {
      return <div></div>;
    }

    return (
      <div className="question-solve">
        <div className="row">
          <div className="col-sm-10">
            <h2>{question.title}</h2>
            <p>{question.description}</p>
          </div>

          <div className="col-sm-2">
            <Link to="default" className="btn btn-primary back">Back</Link>
          </div>
        </div>

        <form className="form-inline text-center">

          {this.displayTimer()}

          <span className="solution">
            <span>/</span>
            <input ref="solutionText"
              onChange={this.setRegex}
              type="text"
              className="regex form-control"
              placeholder="Regex solution..."/>
            <span>/</span>
          </span>

          {this.state.solved ? this.displayScore() : null}

          {this.state.solved === null ? <p className="error-msg">Please provide valid regular expression</p> : null}
          {this.state.solved ? <h3 className="success">Success!!! Solved All Test Cases!</h3> : null}

          {this.state.solved ?
            <div className="text-center">
              <Link to="leaderboard">Leaderboard</Link>
            </div> : null}

        </form>

        <div className="test-cases">

          <p className="instruction">{'Make all words turn green to complete the challenge'}</p>
          <div className="col-sm-6 text-center">
            <h3>{'Should match'}</h3>
            {this.displayTestCases('truthy', true)}
          </div>
          <div className="col-sm-6 text-center">
            <h3>{'Should not match'}</h3>
            {this.displayTestCases('falsy', false)}
          </div>

        </div>
      </div>
    )
  }
});

module.exports = DetailView;
