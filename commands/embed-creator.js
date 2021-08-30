const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Create an embed with your custom text!')
        .addStringOption(option => option.setName('title').setDescription('Enter a title').setRequired(true))
        .addStringOption(option => option.setName('body').setDescription('Enter the body').setRequired(true)),
	async execute(interaction) {
        const title = interaction.options.getString('title');
        const body = interaction.options.getString('body');

        if (title.length > 250) {
            return await interaction.reply({content: `<a:x_:826577785173704754> The title must be less than 250 characters long.`, ephemeral: true})
        }
        if (body.length > 1500) {
            return await interaction.reply({content: `<a:x_:826577785173704754> The body must be less than 1500 characters long.`, ephemeral: true})
        }

        embed = new MessageEmbed()
        .setColor('0')
        .setTitle(`${title}`)
        .setDescription(`${body}`)
        .setFooter(`Created by ${interaction.user.tag}`)


        if (interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES"))
        {
            if (interaction.guild.me.permissionsIn(interaction.channel).has("EMBED_LINKS")) {
                try {
                    await interaction.channel.send({ embeds: [embed] })
                } catch(DiscordAPIError) {
                    return await interaction.reply(({ content: `<a:x_:826577785173704754> I do not have the "embed links" or "send messages" permission in this channel!`, ephemeral: true }));
                }

                return await interaction.reply(({ content: `<a:check:826577847023829032>`, ephemeral: true }));
            } else {
                return await interaction.reply(({ content: `<a:x_:826577785173704754> I do not have the "embed links" permission in this channel!`, ephemeral: true }));
            }
        } else {
            return await interaction.reply(({ content: `<a:x_:826577785173704754> I do not have the "send messsages" permission in this channel!`, ephemeral: true }));

        }
	},
};