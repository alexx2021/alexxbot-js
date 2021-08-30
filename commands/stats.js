const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Bot stats.'),
	async execute(interaction) {
        const Embed = new MessageEmbed()
        .setColor('0x7289da')
        .setTitle('About the Bot')
        .setDescription('A multi-purpose discord bot written in javascript by Alexx#7687 that is straightforward and easy to use.\n Oh, and how could I forget? Cats. Lots of cats. :cat:')
        .addFields(
            { name: 'Total Guilds', value: `${interaction.client.guilds.cache.size}`, inline: true },
            { name: 'Total Users', value: `${interaction.client.users.cache.size}`, inline: true },
        )
        .setTimestamp()

		await interaction.reply({ embeds: [Embed] });
        
	},
};