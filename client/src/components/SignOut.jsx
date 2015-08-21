var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Signout = React.createClass({

  signout: function() {
    this.setState({profile: null});
    window.localStorage.removeItem('com.TearsOfTheAncients');
    window.localStorage.removeItem('com.TearsOfTheAncients.username');
  },

  handleClick: function() {
    this.signout();
  },

  render: function() {
    return (
      <div>
        <Link onClick={this.handleClick} to="signin">Logout</Link>
      </div>
    );
  }
});

module.exports = Signout;
