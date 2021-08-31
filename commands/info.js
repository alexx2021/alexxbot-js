const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user, the server, or the bot!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('bot')
                .setDescription('Info about the bot')),

    async execute(interaction) {

        // Userinfo
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');
            const member = interaction.guild.members.cache.get(user.id)

            const userEmbed = new MessageEmbed()

            //Check if user exists in the current guild
            if (member) {
                //Check number of roles to avoid too many chars in an embed
                if (member.roles.cache.size > 15) {
                    userEmbed.addFields(
                        { name: 'Roles:', value: `Error. User has too many roles.`, inline: true },
                        { name: 'Joined the server on:', value: `${interaction.member.joinedAt.toLocaleString()}`, inline: true },
                    )
                } else {
                    userEmbed.addFields(
                        { name: 'Roles:', value: `${member.roles.cache.map(r => `${r}`).join(' ')}`, inline: true },
                        { name: 'Joined the server on:', value: `${interaction.member.joinedAt.toLocaleString()}`, inline: true },
                    )
                }

            }

            userEmbed
                .setAuthor(`${user.tag} (${user.id})`, user.avatarURL())
                .setColor('0x7289da')
                .setTitle('User Info')
                .addFields(
                    { name: 'Created account on:', value: `${user.createdAt.toLocaleString()}`, inline: true },
                )
                .setTimestamp()

            await interaction.reply({ embeds: [userEmbed] });
        }

        // Serverinfo
        if (interaction.options.getSubcommand() === 'server') {
            const guildEmbed = new MessageEmbed()
                .setTitle('Server Info')
                .setAuthor(`${interaction.guild.name} (${interaction.guild.id})`, interaction.guild.iconURL())
                .setColor('0x7289da')
                .addField(`Owner:`, `${interaction.guild.members.cache.get(interaction.guild.ownerId)} (${interaction.guild.ownerId})`)
                .addField('Member Count:', `${interaction.guild.memberCount}`, true)
                .addField('Created On:', `${interaction.guild.createdAt.toLocaleString()}`, true)
                .setTimestamp()

            await interaction.reply({ embeds: [guildEmbed] });
        }

        // Bot stats
        if (interaction.options.getSubcommand() === 'bot') {

            const botEmbed = new MessageEmbed()
                .setColor('0x7289da')
                .setTitle('About the Bot')
                .setDescription('A multi-purpose discord bot written in javascript by Alexx#7687 that is straightforward and easy to use.\n Oh, and how could I forget? Cats. Lots of cats. :cat:')
                .addFields(
                    { name: 'Total Guilds:', value: `${interaction.client.guilds.cache.size}`, inline: true },
                    { name: 'Total Users:', value: `${interaction.client.users.cache.size}`, inline: true },
                )
                .setTimestamp()

            await interaction.reply({ embeds: [botEmbed] });
        }



    }


};

