var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ProblemsNav = React.createClass({

  render: function() {
    return (
      <div>
        <Link to="default">Problems</Link>
      </div>
    );
  }
});

module.exports = ProblemsNav;
