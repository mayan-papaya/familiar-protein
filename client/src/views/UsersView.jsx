var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var UsersView = React.createClass({
  getInitialState: function(){
    return {
      users: []
    };
  },

  loadAllUsers: function(){
    $.ajax({
      url: window.location.origin + '/users',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        this.setState({users: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(xhr, status, err.message);
      }
    });
  },

  componentDidMount: function(){
    this.loadAllUsers();
  },

  render: function() {
    var users = this.state.users.map(function(user) {
      return (

        <tr className="sample">
          <td className="col-md-2">{user.username}</td>
          <td className="col-md-2"><a className="btn btn-sm btn-primary pull-right">Follow</a></td>
        </tr>

      );
    });

    return (
      <div>
        <div className="row">
            <div className="col-md-10 col-md-offset-1">

              <table className="table table-hover">
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
                {users}
              </table>

            </div>
          </div>
      </div>
    );
  }
});

module.exports = UsersView;
