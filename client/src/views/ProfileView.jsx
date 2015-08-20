var React = require('react');

var Router = require('react-router');
var $ = require('jquery');
var Link = Router.Link;

var ProfileView = React.createClass({

  render: function() {
    var questions = this.props.profile.questions.map(function(question) {
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
                  <h2 className="profile-user-header">{this.props.profile.username}</h2>
                  <br></br>
                  <br></br>
                  <div className="row">
                    <div className="col-md-11">
                      <table className="profile-user-table table table-hover">
                        <tr>
                          <td>Highest Score:</td><td>{this.props.profile.highestScore}</td>
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
