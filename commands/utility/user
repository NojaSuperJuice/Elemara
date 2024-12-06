const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
        await interaction.reply(`Hi ${interaction.user.username}! Looks like you joined on ${interaction.member.joinedAt}.`);
	},
};