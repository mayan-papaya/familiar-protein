var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ProfileNav = React.createClass({

  render: function() {
    return (
      <div>
        <Link to="profileView">Profile</Link>
      </div>
    );
  }
});

module.exports = ProfileNav;
