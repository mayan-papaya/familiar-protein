var React = require('react');

require('expose?$!expose?jQuery!jquery');
var $ = require('jquery');
require('bootstrap-webpack');

var OverView = require('./views/Overview.jsx');
var DetailView = require('./views/DetailView.jsx');
var Signin = require('./views/Signin.jsx');
var Signup = require('./views/Signup.jsx');
var ProfileView = require('./views/ProfileView.jsx')
var UsersView = require('./views/UsersView.jsx')
var Leaderboard = require('./views/Leaderboard.jsx')

var SignOut = require('./components/SignOut.jsx');
var ProfileNav = require('./components/ProfileNav.jsx');
var SignInNav = require('./components/SignInNav.jsx');
var ProblemsNav = require('./components/ProblemsNav.jsx');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Link = Router.Link;


var App = React.createClass({
  getInitialState: function(){
    return {
      questions: []
    };
  },

  loadAllQuestions: function(){
    $.ajax({
      url: window.location.origin + '/questions',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        data.sort(function(a, b){
          return a.qNumber - b.qNumber;
        });
        this.setState({questions: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(xhr, status, err.message);
      }
    });
  },

  getUser: function(){
    var user = {username: window.localStorage.getItem('com.TearsOfTheAncients.username') || null};
    // console.log(user);
    if(user.username === null) {
      console.log('user is not logged in');
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
    this.loadAllQuestions();
  },

  render: function() {
    return (
      <div className="container">

        <div className="text-right">
          <SignInNav />
          <ProfileNav />
          <ProblemsNav />
        </div>

        <h2 className="title">Regex Quest 2: Tears of the Ancients</h2>
        <RouteHandler profile={this.state.profile} questions={this.state.questions} />
      </div>
    );
  }

});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="question" path="/questions/:qNumber" handler={DetailView}/>
    <Route name="leaderboard" handler={Leaderboard} />
    <Route name="signin" handler={Signin} />
    <Route name="signup" handler={Signup} />
    <Route name="profileView" handler={ProfileView} />
    <Route name="usersView" handler={UsersView} />
    <DefaultRoute name="default" handler={OverView} />
  </Route>
);

Router.run(routes, function(Root){
  React.render(<Root />, document.body);
});
