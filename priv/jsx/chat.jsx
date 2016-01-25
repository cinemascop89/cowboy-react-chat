var React = require('react');
var Conversation = require('./conversation.jsx').Conversation;
var UserList = require('./user-list.jsx').UserList;
var Websocket = require('./websocket.jsx').Websocket;

exports.Chat = React.createClass({
    getInitialState: function() {
        var username = "user" + parseInt(Math.random()*1000).toString();
        return {history: [], users: [], username: username};
    },
    handleEvent: function(evt) {
        console.log(evt);
        if (evt.event === "join") {
            var users = this.state.users;
            users.push(evt.data);
            this.setState({users: users});
        } else if (evt.event === "message") {
            if (evt.data.author === this.state.username)
                return;
            var history = this.state.history;
            history.push(evt.data);
            this.setState({history: history});
        } else if (evt.event === "rename") {
            var users = this.state.users;
            var pos = users.indexOf(evt.data.username);
            if (pos >= 0) {
                users[pos] = evt.data.newUsername;
                this.setState({users: users});
            }
        }
    },
    handleConnect: function() {
        this.refs.ws.sendJoin(this.state.username);
    },
    handleSubmit: function(content) {
        var history = this.state.history;
        var message = {
            author: this.state.username,
            timestamp: Date.now(),
            content: content
        };
        this.refs.ws.sendMessage(content);
        history.push(message);
        this.setState({history: history});
    },
    handleUsernameChange: function(newUsername) {
        this.refs.ws.sendRename(newUsername);
        this.setState({username: newUsername});
    },
    render: function() {
        return (
            <div className="wrapper">
                <Websocket ref="ws"
                           onEvent={this.handleEvent}
                           onConnect={this.handleConnect} />
                <Conversation username={this.state.username}
                              history={this.state.history}
                              onSubmit={this.handleSubmit}
                              onUsernameChange={this.handleUsernameChange}/>
                <UserList users={this.state.users} />
            </div>
        );
    }
});
