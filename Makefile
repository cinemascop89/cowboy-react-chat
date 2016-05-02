PROJECT = chat
DEPS = cowboy jsx
NO_AUTOPATCH = jsx
dep_jsx = git https://github.com/talentdeficit/jsx
PROJECT_DESCRIPTION = React & cowboy chat application
PROJECT_VERSION = 0.0.1

LOCAL_DEPS = sasl runtime_tools

include erlang.mk
