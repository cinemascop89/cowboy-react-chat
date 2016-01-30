
export const USER_JOIN = 'CHAT_JOIN';
export const USER_LEAVE = 'CHAT_LEAVE';
export const USER_MESSAGE = 'CHAT_MESSAGE';
export const USER_RENAME = 'CHAT_RENAME';
export const USER_LIST = 'CHAT_LIST';

export function userJoin(username) {
    return {
        type: USER_JOIN,
        username
    };
}

export function userLeave(username) {
    return {
        type: USER_LEAVE,
        username
    };
}

export function addMessage(content, author, timestamp) {
    return {
        type: USER_MESSAGE,
        content, author, timestamp
    };
}

export function renameUser(oldName, newName) {
    return {
        type: USER_RENAME,
        oldName, newName
    };
}

export function userList(users) {
    return {
        type: USER_LIST,
        users
    }
}
