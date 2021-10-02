const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Create an embed with your custom text!')
        .addStringOption(option => option.setName('title').setDescription('Enter a title').setRequired(true))
        .addStringOption(option => option.setName('body').setDescription('Enter the body').setRequired(true)),
    async execute(interaction) 
        {
            const title = interaction.options.getString('title');
            const body = interaction.options.getString('body');

            // Check if input adheres to length limitations to avoid errors
            if (title.length > 250) 
            {
                return await interaction.reply({ content: `<a:x_:826577785173704754> The title must be less than 250 characters long.`, ephemeral: true })
            }
            if (body.length > 1500) 
            {
                return await interaction.reply({ content: `<a:x_:826577785173704754> The body must be less than 1500 characters long.`, ephemeral: true })
            }

            embed = new MessageEmbed()
                .setColor('0')
                .setTitle(`${title}`)
                .setDescription(`${body}`)
                .setFooter(`Created by ${interaction.user.tag}`)

            // Check to see if the user has manage messages permissions
            if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
            {
                return await interaction.reply(({ content: `<a:x_:826577785173704754> You need the \`Manage messages\` permission to use this command :( `, ephemeral: true }));
            }
        

            // Check if permissions in the channel used to invoke the command are what is required to avoid errors
            if (interaction.guild.me.permissionsIn(interaction.channel).has(Permissions.FLAGS.SEND_MESSAGES) && interaction.guild.me.permissionsIn(interaction.channel).has(Permissions.FLAGS.EMBED_LINKS) && interaction.guild.me.permissionsIn(interaction.channel).has(Permissions.FLAGS.VIEW_CHANNEL)) 
                {
                    try 
                        {
                            await interaction.channel.send({ embeds: [embed] })
                            return await interaction.reply(({ content: `<a:check:826577847023829032>`, ephemeral: true }));
                        } 
                    catch (DiscordAPIError) 
                        { // Catch error if channel is a thread (thread permissions are not in the library yet)
                            return await interaction.reply(({ content: `<a:x_:826577785173704754> Please check that I have the "embed links", "send messages", and "view channel" permissions in this channel!`, ephemeral: true }));
                        }
                } 
            else 
                {
                    return await interaction.reply(({ content: `<a:x_:826577785173704754> Please check that I have the "embed links", "send messages", and "view channel" permissions in this channel!!`, ephemeral: true }));
                }
        }
};