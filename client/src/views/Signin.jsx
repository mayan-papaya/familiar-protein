var React = require('react');
var $ = require('jquery');

var Router = require('react-router');
var Link = Router.Link;

var Signin = React.createClass({

  signin: function(user){
    $.ajax({
      url: window.location.origin + '/signin', // signin route
      method: 'POST',
      dataType: 'json',
      data: user, // data is user
      success: function(data){
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

  handleSubmit: function(){
    var name = React.findDOMNode(this.refs.name).value;
    var password = React.findDOMNode(this.refs.password).value;
    var user = {
      username: name,
      password: password
    }
    this.signin(user);
  },

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div>
              <h3>Sign In</h3>
            </div>
            <div className="row col-md-4 signin-margin">
              <form onSubmit={this.handleSubmit}>
              <input type="text" className="form-control input-md" required ref="name" className="text" placeholder="Username"/>
              <div></div>
              <input type="password" className="form-control input-md" required ref="password" className="text" placeholder="Password"/>
              <input type="submit" className="btn btn-primary" value="Submit"/>
              </form>
            </div>
            <br></br>
            <div className="row">
              <div className="col-md-4">Need new account?</div>
            </div>
            <div className="row">
              <div className="col-md-4">
              <td><Link to="signup" className="btn btn-primary">Signup</Link></td>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Signin;
