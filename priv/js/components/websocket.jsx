var React = require('react');

exports.Websocket = React.createClass({
    handleOpen: function() {
        this.props.onConnect();
    },
    handleMessage: function(event) {
        this.props.onEvent(JSON.parse(event.data));
    },
    componentDidMount: function() {
        var socket = new WebSocket("ws://" + document.location.host + "/chat");
        socket.onopen = this.handleOpen;
        socket.onmessage = this.handleMessage;
        this.setState({socket: socket});
    },
    sendEvent(type, payload) {
        var msg = JSON.stringify({
            event: type,
            data: payload
        });
        this.state.socket.send(msg);
    },
    sendJoin(username) {
        this.sendEvent("join", username);
    },
    sendMessage(content) {
        this.sendEvent("message", content);
    },
    sendRename(newUsername) {
        this.sendEvent("rename", newUsername);
    },
    render: function() {
        return null;
    }
});
