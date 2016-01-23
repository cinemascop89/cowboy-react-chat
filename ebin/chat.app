{application, chat, [
	{description, "React & cowboy chatt application"},
	{vsn, "0.0.1"},
	{modules, ['chat_app','chat_event_message','chat_handler','chat_sup']},
	{registered, [chat_sup]},
	{applications, [kernel,stdlib,cowboy,jsx]},
	{mod, {chat_app, []}}
]}.