const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('pong!'),
	async execute(interaction) {
		await interaction.reply(`🏓 Pong! **${Math.round(interaction.client.ws.ping)}ms**`);
	},
};