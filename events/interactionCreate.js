module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} (${interaction.user.id}) in #${interaction.channel.name} (${interaction.guild.name}) triggered an interaction (${interaction.commandName}).`);
	},
};