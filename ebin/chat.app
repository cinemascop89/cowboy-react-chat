{application, chat, [
	{description, "React & cowboy chat application"},
	{vsn, "0.0.1"},
	{modules, ['chat_app','chat_event_message','chat_handler','chat_sup','chat_user_list']},
	{registered, [chat_sup]},
	{applications, [kernel,stdlib,sasl,runtime_tools,cowboy,jsx]},
	{mod, {chat_app, []}}
]}.