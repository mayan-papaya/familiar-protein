var React = require('react');

var $ = require('jquery');
var Router = require('react-router');
var Link = Router.Link;

var Signout = require('./Signout.jsx');


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
        <tr className="question">
          <td><b>{question.title}</b></td>
          <td><p>{question.score}</p></td>
          <td><p>{question.time}</p></td>
          <td><p>{question.answer}</p></td>
        </tr>
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
                    <div className="col-md-11">
                      <table className="profile-user-table table table-hover">
                        <tr>
                          <td>Highest Score:</td><td>{this.state.profile.highestScore}</td>
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
