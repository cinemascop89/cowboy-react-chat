var React = require('react');
import {createStore} from 'redux';
import {Provider} from 'react-redux';
var ReactDOM = require('react-dom');
import Chat from './components/chat.jsx'
import {chatApp} from './reducers';
import {userJoin, addMessage, renameUser} from './actions';

window.React = React;

let store = createStore(chatApp);

ReactDOM.render(
    <Provider store={store}>
        <Chat />
    </Provider>,
    document.getElementById('app')
);
