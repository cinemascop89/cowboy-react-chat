-module(chat_handler).
-behaviour(cowboy_websocket_handler).

-export([init/3]).
-export([websocket_init/3]).
-export([websocket_handle/3]).
-export([websocket_info/3]).
-export([websocket_terminate/3]).

-record(message, {
          timestamp,
          author,
          content
         }).

-record(state, {
          username
         }).

init(_, _, _) ->
    {upgrade, protocol, cowboy_websocket}.

websocket_init(_, Req, _Opts) ->
    Req2 = cowboy_req:compact(Req),
    chat_event_message:add_handler(self()),
    {ok, Req2, #state{}}.

websocket_handle({text, Json}, Req, #state{username=Username} = State) ->
    #{<<"event">> := EventType,
      <<"data">> := Data} = jsx:decode(Json, [return_maps]),
    {_, Timestamp, _} = erlang:timestamp(),
    NewState = case EventType of
                   <<"message">> ->
                       chat_event_message:message(#message{timestamp=Timestamp,
                                                           author=Username,
                                                           content=Data}),
                       State;
                   <<"join">> ->
                       chat_event_message:join(Data),
                       State#state{username=Data};
                   <<"rename">> ->
                       chat_event_message:rename(Username, Data),
                       State#state{username=Data}
               end,
    {ok, Req, NewState};
websocket_handle({binary, Data}, Req, State) ->
    {reply, {binary, Data}, Req, State};
websocket_handle(_Frame, Req, State) ->
    {ok, Req, State}.

websocket_info({message, #message{timestamp=Timestamp,
                                  author=Author,
                                  content=Content}}, Req, State) ->
    Message = #{<<"timestamp">> => Timestamp,
                <<"author">> => Author,
                <<"content">> => Content},
    Encoded = encode_msg(message, Message),
    {reply, {text, Encoded}, Req, State};
websocket_info({join, User}, Req, State) ->
    Encoded = encode_msg(join, User),
    {reply, {text, Encoded}, Req, State};
websocket_info({rename, User, NewUser}, Req, State) ->
    Message = #{<<"username">> => User,
                <<"newUsername">> => NewUser},
    Encoded = encode_msg(rename, Message),
    {reply, {text, Encoded}, Req, State};
websocket_info(_Info, Req, State) ->
    {ok, Req, State}.

websocket_terminate(_Reason, _Req, _State) ->
    ok.


encode_msg(Event, Payload) ->
    jsx:encode(#{<<"event">> => list_to_binary(atom_to_list(Event)),
                 <<"data">> => Payload}).
