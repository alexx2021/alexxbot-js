const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('classic 8ball!')
        .addStringOption(option => option.setName('question').setDescription('Enter a question').setRequired(true)),
	async execute(interaction) {
        const array = ['As I see it, yes.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.',
       'Don’t count on it.', 'It is certain.','It is decidedly so.','Most likely.','My reply is no.',' My sources say no.','Outlook not so good.',
       'Outlook good.','Reply hazy, try again.','Signs point to yes.','Very doubtful.','Without a doubt.','Yes.',' Yes – definitely.',' You may rely on it.']

       const q = interaction.options.getString('question');

            // Check if input adheres to length limitations to avoid errors
            if (q.length > 300) {
            return await interaction.reply({content: `<a:x_:826577785173704754> The question must be less than 300 characters long.`, ephemeral: true})
            }

        const randomElement = array[Math.floor(Math.random() * array.length)];
		await interaction.reply(`Question: *${q}*\n\n🎱 ${randomElement}`);
	},
};