require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

const { Client, GatewayIntentBits } = require('discord.js');
const OpenAI = require('openai');


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});


client.once('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}!.`);
});

client.on('messageCreate', message => {
	if (message.author.bot) return; 
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

	client.on('messageCreate', async (message) => {
		if (message.author.bot) return;
	
		try {
			const response = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [{ role: "user", content: message.content }],
				max_tokens: 150,
			});
			const reply = response.data.choices[0].message.content;
			message.reply(reply);
		} catch (error) {
			console.error("Error:", error);
			message.reply("Sorry, I encountered an error!");
		}
	});

client.login(token);
