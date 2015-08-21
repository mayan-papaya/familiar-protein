var React = require('react');

var $ = require('jquery');
var Router = require('react-router');
var Link = Router.Link;

var Signout = require('../components/SignOut.jsx');


var ProfileView = React.createClass({

  getInitialState: function(){
    return {
      questions: [],
      profile: {
        questions: [],
        username: '',
        highestScore: ''
      }
    };
  },

  getUser: function(){
    var user = {username: window.localStorage.getItem('com.TearsOfTheAncients.username') || null};
    // console.log(user);
    if(user.username === null) {
      console.log('user is not logged in..');
      this.setState({profile: null});
    } else {
      $.ajax({
        url: window.location.origin + '/profile',
        type: 'POST',
        data: JSON.stringify(user),
        contentType: 'application/json',
        success: function(data){
          this.setState({profile: JSON.parse(data)});
        }.bind(this),
        error: function(xhr, status, err){
          console.error(xhr, status, err.message);
        }
      });
    }
  },

  componentDidMount: function(){
    this.getUser();
  },

  render: function() {

    var questions = this.state.profile.questions.map(function(question) {
      return (
        <div>
        <table className="question">
          <tr><b>{question.title}</b></tr>
          <tr><p>Score: {question.score}</p></tr>
          <tr><p>Time: {question.time}</p></tr>
          <tr><p>Answer: {question.answer}</p></tr>
        </table>
        </div>
      )
    });

    return (
      <div className="text-center">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="well">
              <div className="row">
                <div className="profile-user-info col-md-8 text-left">
                  <h2 className="profile-user-header">{this.state.profile.username}</h2>
                  <Signout />
                  <br></br>
                  <br></br>
                  <div className="row">
                    <div>
                      <table className="profile-user-table table table-hover">
                        <tr>
                          <td>Highest Score:</td>
                          <td>
                          <div>
                          <table className="question">
                            <tr><b>{this.state.profile.highestScore.title}</b></tr>
                            <tr><p>Score: {this.state.profile.highestScore.score}</p></tr>
                            <tr><p>Time: {this.state.profile.highestScore.time}</p></tr>
                            <tr><p>Answer: {this.state.profile.highestScore.answer}</p></tr>
                          </table>
                          </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Questions Answered:</td><td>{questions}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
});

module.exports = ProfileView;
