require('dotenv').config();
const { token } = process.env.DISCORD_TOKEN

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}!.`);
})

client.login(token);
