import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import {config} from "../config";

const execSync = require('child_process').execSync

export const data = new SlashCommandBuilder()
    .setName('whitelistadd')
    .setDescription('Whitelists a player')
    .addStringOption(option => option.setName('username').setDescription('Minecraft username').setRequired(true))
    .addStringOption(option => option.setName('ip').setDescription('Ip address').setRequired(true))

export async function execute(interaction: CommandInteraction) {
    const usernameIndex = interaction.options.data[0].name === 'username' ? 0 : 1
    const ipIndex = usernameIndex === 0 ? 1 : 0

    execSync(`tmux send-keys -t ${config.TMUX_SESSION_NAME} \"whitelist add ${interaction.options.data[usernameIndex]}\"`, { encoding: 'utf-8' })
    execSync(`sudo iptables -A INPUT -p tcp -s ${interaction.options.data[ipIndex]} --dport 25565 -j ACCEPT`, { encoding: 'utf-8' })
    execSync('sudo iptables-save | sudo tee /etc/iptables/rules.v4', { encoding: 'utf-8' })

    return interaction.reply("Added")
}
