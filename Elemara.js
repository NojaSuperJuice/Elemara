require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const openai_api_key = process.env.OPENAI_API_KEY;

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const configuration = new Configuration({
	apiKey: openai_api_key,
});
const openai = new OpenAIApi(configuration);

client.once('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}!.`);
});

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

client.on('messageCreate', async message => { 
		if (message.author.bot) return;  
		if (!message.content.startsWith('!Elemara ')) return;  
		
		const prompt = message.content.slice(5);  
		try { 
			const response = await openai.createCompletion({ 
				model: 'text-davinci-003', 
				prompt: prompt, 
				max_tokens: 150, }); 
				message.channel.send(response.data.choices[0].text.trim()); 
			} catch (error) { console.error(error); 
				message.channel.send('Sorry, something went wrong.'); 
			} 
		});

client.login(token);
