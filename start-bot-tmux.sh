#!/usr/bin/env bash

session_name="discord-bot"

tmux new -ds $session_name
tmux send-keys -t $session_name "cd ~/minecraft-discord-bot" "Enter"
tmux send-keys -t $session_name "npm run start" "Enter"