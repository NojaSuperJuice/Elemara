require('dotenv').config();
const { token } = process.env.DISCORD_TOKEN

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}!.`);
})

client.on('messageCreate', message => {
	 if (message.content.startsWith('!settimer ')) { 
		const args = message.content.split(' '); 
		const time = parseInt(args[1]); if (isNaN(time)) { 
			message.reply('Hey! You need to provide a valid number of seconds!'); 
			return;
		 } 
		 
		 message.channel.send(`Hey <@${message.author.id}>! You've set a timer set for ${time} seconds!`);
		
		 setTimeout(() => { message.channel.send(`Time's up <@${message.author.id}>!`); }, time * 1000); 
		}
	});
client.login(token);
