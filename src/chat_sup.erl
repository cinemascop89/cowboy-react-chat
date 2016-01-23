-module(chat_sup).
-behaviour(supervisor).

-export([start_link/0]).
-export([init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    EventManager = {chat_event_message, {chat_event_message, start_link, []},
                    permanent, 2000, worker, [chat_event_message]},
    Procs = [EventManager],
    {ok, {{one_for_one, 1, 5}, Procs}}.
