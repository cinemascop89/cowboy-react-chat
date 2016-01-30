import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {userJoin, userLeave, addMessage, renameUser} from '../actions'
var Conversation = require('./conversation.jsx').Conversation;
var UserList = require('./user-list.jsx').UserList;
var Websocket = require('./websocket.jsx').Websocket;

var Chat = React.createClass({
    propTypes: {
        history: PropTypes.arrayOf(PropTypes.shape({
            timestamp: PropTypes.number.isRequired,
            author: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })),
        users: PropTypes.arrayOf(PropTypes.string),
        username: PropTypes.string.isRequired
    },
    handleEvent: function(evt) {
        var dispatch = this.props.dispatch;
        if (evt.event === "join") {
            dispatch(userJoin(evt.data));
        } else if (evt.event === "leave") {
            dispatch(userLeave(evt.data));
        } else if (evt.event === "message") {
            if (evt.data.author === this.props.username)
                return;
            dispatch(addMessage(evt.data.content,
                                evt.data.author,
                                evt.data.timestamp));
        } else if (evt.event === "rename") {
            dispatch(renameUser(evt.data.username,
                                evt.data.newUsername));
        }
    },
    handleConnect: function() {
        this.refs.ws.sendJoin(this.props.username);
    },
    handleSubmit: function(content) {
        var dispatch = this.props.dispatch;
        var username = this.props.username;
        dispatch(addMessage(content, username, Date.now()));
        this.refs.ws.sendMessage(content);
    },
    handleUsernameChange: function(newUsername) {
        var dispatch = this.props.dispatch;
        var username = this.props.username;
        dispatch(renameUser(username, newUsername));
        this.refs.ws.sendRename(newUsername);
    },
    render: function() {
        return (
            <div className="wrapper">
                <Websocket ref="ws"
                           onEvent={this.handleEvent}
                           onConnect={this.handleConnect} />
                <Conversation username={this.props.username}
                              history={this.props.history}
                              onSubmit={this.handleSubmit}
                              onUsernameChange={this.handleUsernameChange}/>
                <UserList users={this.props.users} />
            </div>
        );
    }
});

export default connect((state) => state)(Chat)
