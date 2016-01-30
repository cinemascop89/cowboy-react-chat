var React = require('react');

exports.Username = React.createClass({
    getInitialState() {
        return {
            editing: false,
        }
    },
    handleClick(e) {
        e.preventDefault();
        if (!this.state.editing) {
            this.setState({
                editing: true,
                nextUsername: this.props.username
            });
        }
    },
    handleKeyUp(e) {
        e.preventDefault();
        if (e.keyCode === 13) {
            this.setState({editing: false});
            this.props.onUsernameChange(this.state.nextUsername);
        }
    },
    handleChange(e) {
        this.setState({
            nextUsername: e.target.value
        });
    },
    render() {
        var elem;
        if (this.state.editing) {
            elem = <input onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            value={this.state.nextUsername}
            type="text"
            autoFocus/>;
        } else {
            elem = <span>{this.props.username}</span>;
        }
        return (
            <span className="username" onClick={this.handleClick}>
                {elem}
            </span>
        );
    }
});
