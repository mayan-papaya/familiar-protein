var React = require('react');
var $ = require('jquery');

var Router = require('react-router');
var Link = Router.Link;

var Signup = React.createClass({

  signup: function(user){
    $.ajax({
      url: window.location.origin + '/signup', //signup route
      type: 'POST',
      data: JSON.stringify(user), //data is stringified user obj
      contentType: 'application/json',
      success: function(token){
        window.localStorage.setItem('com.TearsOfTheAncients', token);
        window.localStorage.setItem('com.TearsOfTheAncients.username', user.username);
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
    this.signup(user);
  },

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div>
              <h3>Sign Up</h3>
            </div>
            <div className="row col-md-4 signup-margin">
              <form onSubmit={this.handleSubmit}>
              <input type="text" className="form-control input-md" required ref="name" className="text" placeholder="Username"/>
              <br></br>
              <input type="password" className="form-control input-md" required ref="password" className="text" placeholder="Password"/>
              <br></br>
              <input type="password" className="form-control input-md" required className="text" placeholder="Confirm Password"/>
              <input type="submit" className="btn btn-primary" value="Submit"/>
              </form>
            </div>
            <br></br>
            <div className="row">
              <div className="col-md-4">Already have an account?</div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <td><Link to="signin" className="btn btn-primary">Signin</Link></td>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Signup;
