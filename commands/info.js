const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info about a user, the current guild, or the bot!')
        .addStringOption(option =>
            option.setName('target')
                .setRequired(true)
                .setDescription('Get info about a user, the server, or the bot!')
                .addChoice('user', 'user')
                .addChoice('server', 'guild')
                .addChoice('bot', 'bot')),
	
    async execute(interaction) {

        const choice = interaction.options.getString('target');

        if (choice == 'bot') {
            const botEmbed = new MessageEmbed()
            .setColor('0x7289da')
            .setTitle('About the Bot')
            .setDescription('A multi-purpose discord bot written in javascript by Alexx#7687 that is straightforward and easy to use.\n Oh, and how could I forget? Cats. Lots of cats. :cat:')
            .addFields(
                { name: 'Total Guilds', value: `${interaction.client.guilds.cache.size}`, inline: true },
                { name: 'Total Users', value: `${interaction.client.users.cache.size}`, inline: true },
            )
            .setTimestamp()
    
            await interaction.reply({ embeds: [botEmbed] });
            
        }

        if (choice == 'guild') {
            const guildEmbed = new MessageEmbed()
            .setTitle('Server Info')
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setColor('0x7289da')
            .addField(`Owner:`, `${interaction.guild.members.cache.get(interaction.guild.ownerId)} (${interaction.guild.ownerId})`)
            .addField('Member Count', `${interaction.guild.memberCount}`, true)
            .addField('Created', `${interaction.guild.createdAt.toLocaleString()}`, true)
            .setTimestamp()

            await interaction.reply({ embeds: [guildEmbed] });

        }
        
        
	},
};

