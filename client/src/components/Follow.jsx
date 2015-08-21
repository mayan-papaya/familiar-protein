var React = require('react');
var Router = require('react-router');

var Follow = React.createClass({

  follow: function() {
    var data = {
      user: window.localStorage.getItem('com.TearsOfTheAncients.username') || null,
      toFollow: this.props.following
    }
    $.ajax({
      url: window.location.origin + '/follow',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(data){
        console.log(data);
      },
      error: function(xhr, status, err) {
        console.error(xhr, status, err.message);
      }
    });
  },

  render: function() {
    return (
      <td className="col-md-2"><a onClick={this.follow} className="btn btn-sm btn-primary pull-right">Follow</a></td>
    );
  }
});

module.exports = Follow;