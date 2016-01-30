-module(chat_app).
-behaviour(application).

-export([start/2]).
-export([stop/1]).

start(_Type, _Args) ->
    Dispatch = cowboy_router:compile([
                                      {'_', [
                                             {"/", cowboy_static, {priv_file, chat, "index.html"}},
                                             {"/css/[...]", cowboy_static, {priv_dir, chat, "css"}},
                                             {"/js/[...]", cowboy_static, {priv_dir, chat, "js"}},
                                             {"/chat", chat_handler, []}
                                            ]}
                                     ]),
    cowboy:start_http(http_listener, 100, [{port, 8080}],
                      [{env, [{dispatch, Dispatch}]}]),
    chat_user_list:init(),
    chat_sup:start_link().

stop(_State) ->
	ok.
