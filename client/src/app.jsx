var React = require('react');

var $ = require('jquery');
require('bootstrap-webpack');

var OverView = require('./views/Overview.jsx');
var DetailView = require('./views/DetailView.jsx');
var Signin = require('./views/Signin.jsx');
var Signup = require('./views/Signup.jsx');
var ProfileView = require('./views/ProfileView.jsx')

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;


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
        console.error(xhr, status, err.message);
      }
    });
  },

  componentDidMount: function(){
    this.loadAllQuestions();
  },

  render: function() {
    return (
      <div className="container">
        <h2 className="title">Regex Quest 2: Tears of the Ancients</h2>
        <RouteHandler questions={this.state.questions}/>
      </div>
    )
  }

});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="question" path="/questions/:qNumber" handler={DetailView}/>
    <Route name="signin" handler={Signin} />
    <Route name="signup" handler={Signup} />
    <Route name="profileView" handler={ProfileView} />
    <DefaultRoute name="default" handler={OverView} />
  </Route>
);

Router.run(routes, function(Root){
  React.render(<Root />, document.body);
});
