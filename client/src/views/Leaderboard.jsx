var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var Leaderboard = React.createClass({

  render: function() {

    var theLeaders = [
      {
        username: "Harry",
        rank: 1,
        score: 890,
        completeTime: '1:07',
        solutionLength: 12
      },
      {
        username: "Nick",
        rank: 2,
        score: 872,
        completeTime: '1:43',
        solutionLength: 22
      }
    ];

    var leaders = theLeaders.map(function(leader) {
      return (

        <tr className="sample">
          <td className="col-md-2">{leader.rank}</td>
          <td className="col-md-2">{leader.username}</td>
          <td className="col-md-2">{leader.score}</td>
          <td className="col-md-2">{leader.completeTime}</td>
          <td className="col-md-2">{leader.solutionLength}</td>
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
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Time</th>
                  <th>Solution Length</th>
                  <th></th>
                </tr>
                {leaders}
              </table>

            </div>
          </div>
      </div>
    );
  }
});

module.exports = Leaderboard;
