const fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('image')
        .setDescription('Get images of different animals!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('cat')
                .setDescription('cat pix'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('dog')
                .setDescription('dog pix'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('goose')
                .setDescription('goose pix'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('duck')
                .setDescription('duck pix')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'cat') {
            const { url } = await fetch('https://nekos.life/api/v2/img/meow').then(response => response.json());
            catEmbed = new MessageEmbed()
                .setTitle("Kitty! 🐱")
                .setImage(`${url}`)
                .setColor('0x7289da')
                .setTimestamp()
            return await interaction.reply({ embeds: [catEmbed] });
        }

        if (interaction.options.getSubcommand() === 'dog') {
            const { url } = await fetch('https://nekos.life/api/v2/img/woof').then(response => response.json());
            catEmbed = new MessageEmbed()
                .setTitle("Doggo! 🐶")
                .setImage(`${url}`)
                .setColor('0x7289da')
                .setTimestamp()
            return await interaction.reply({ embeds: [catEmbed] });
        }

        if (interaction.options.getSubcommand() === 'goose') {
            const { url } = await fetch('https://nekos.life/api/v2/img/goose').then(response => response.json());
            catEmbed = new MessageEmbed()
                .setTitle("Gooses! :)")
                .setImage(`${url}`)
                .setColor('0x7289da')
                .setTimestamp()
            return await interaction.reply({ embeds: [catEmbed] });
        }

        if (interaction.options.getSubcommand() === 'duck') {
            const { url } = await fetch('https://random-d.uk/api/v1/random?type=png').then(response => response.json());
            catEmbed = new MessageEmbed()
                .setTitle("Gooses! :)")
                .setImage(`${url}`)
                .setColor('0x7289da')
                .setTimestamp()
            return await interaction.reply({ embeds: [catEmbed] });
        }
    },
};