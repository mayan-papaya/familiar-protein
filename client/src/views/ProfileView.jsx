var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var ProfileView = React.createClass({

  getUser: function(username){
    var that = this;
    $.ajax({
      url: window.location.origin + '/profile',
      method: 'GET',
      dataType: 'json',
      data: JSON.stringify(username),
      success: function(data){
        console.log(data);
        that.user = data.user;
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

  render: function() {
    var questions = this.user.questions.map(function(question) {
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
                  <h2 className="profile-user-header">{this.user.username}</h2>
                  <br></br>
                  <br></br>
                  <div className="row">
                    <div className="col-md-11">
                      <table className="profile-user-table table table-hover">
                        <tr>
                          <td>Highest Score:</td><td>{this.user.highestScore}</td>
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
