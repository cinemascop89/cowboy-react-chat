var update = require('react-addons-update');
import {USER_JOIN, USER_LEAVE, USER_MESSAGE, USER_RENAME,
        USER_LIST} from './actions';

var randomUsername = "user" + parseInt(Math.random()*10000).toString();

const initialState = {
    history: [],
    users: [randomUsername],
    username: randomUsername
};

export function chatApp(state = initialState, action) {
    switch (action.type) {
    case USER_MESSAGE:
        return update(state, {
            history: {$push: [{
                timestamp: action.timestamp,
                author: action.author,
                content: action.content,
            }]}
        });
    case USER_RENAME:
        return update(state, {
            username: {$apply: function(u) {
                return u == action.oldName ? action.newName : u;
            }},
            users: {$apply: function(users)  {
                return users.map((u) =>
                                 u === action.oldName ? action.newName : u);
            }}
        });
    case USER_LEAVE:
        return update(state, {
            users: {$apply: function(users) {
                return users.filter((u) => u !== action.username);
            }}
        });
    case USER_JOIN:
        return update(state, {
            users: {$push: [action.username]}
        });
    case USER_LIST:
        return update(state, {
            users: {$set: action.users}
        })
    default:
        return state;
    }
}
