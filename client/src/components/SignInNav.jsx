var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var SignInNav = React.createClass({

  render: function() {
    return (
      <div>
        <Link to="signin">Signin</Link>
      </div>
    );
  }
});

module.exports = SignInNav;
