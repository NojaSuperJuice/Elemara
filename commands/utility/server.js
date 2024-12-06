const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('How many Pixie\'s there are in this server.'),
	async execute(interaction) {
        await interaction.reply(`Hi there! This server has ${interaction.guild.memberCount} members.`);
	},
};