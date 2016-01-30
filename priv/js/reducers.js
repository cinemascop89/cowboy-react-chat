var update = require('react-addons-update');
import {USER_JOIN, USER_MESSAGE, USER_RENAME} from './actions';

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
    case USER_JOIN:
        return update(state, {
            users: {$push: [action.username]}
        });
    default:
        return state;
    }
}
