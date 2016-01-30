-module(chat_user_list).

-export([init/0, add/1, remove/1, rename/2, list/0]).

-record(user, {username}). % dummy record for now

-define(TABLE_ID, ?MODULE).

init() ->
    ets:new(?TABLE_ID, [public, named_table]).

add(Username) ->
    ets:insert(?TABLE_ID, {Username, #user{username=Username}}).

remove(Username) ->
    ets:delete(?TABLE_ID, Username).

rename(Old, New) ->
    case ets:lookup(?TABLE_ID, Old) of
        [{Old, UserState}] ->
            ets:delete(?TABLE_ID, Old),
            ets:insert(?TABLE_ID, {New, UserState});
        [] ->
            ok
    end.

list() ->
    [Username || {Username, _} <- ets:tab2list(?TABLE_ID)].
