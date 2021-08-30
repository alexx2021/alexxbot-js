// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: 
                                    [
                                    Intents.FLAGS.GUILDS,
                                    Intents.FLAGS.GUILD_MEMBERS,
                                    Intents.FLAGS.GUILD_BANS,
                                    Intents.FLAGS.GUILD_VOICE_STATES,
                                    Intents.FLAGS.GUILD_MESSAGES,
                                    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                                    Intents.FLAGS.DIRECT_MESSAGES,
                                    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
                                    ], 
                                    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
                            });



// Commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}


// Events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// Command handler
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


client.login(token);