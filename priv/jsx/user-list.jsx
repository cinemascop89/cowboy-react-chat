var React = require('react');

exports.UserList = React.createClass({
    render: function() {
        var users = this.props.users.map(function(u) {
            return <div key={u} className="user">{u}</div>;
        });
        return (
            <div className="user-list">{users}</div>
        );
    }
});
