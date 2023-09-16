// Import

const { Client, Intents, MessageEmbed } = require('discord.js');
require('dotenv').config();

// Create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the bot is ready, log in and register the slash command
client.once('ready', () => {
    client.user.setActivity('/cmds', { type: 'WATCHING' });
    console.log(`Successfully logged in as ${client.user.tag}`);

    // Register the /cmds slash command
    registerNewCommand();
});

// Define Command Data
const newCommandData = {
    name: 'cmds',
    description: 'Opens my command menu.'
};

async function registerNewCommand() {
    try {
        // Register the slash command
        const commands = await client.application.commands.set([newCommandData]);
        console.log(`Successfully Registered /cmds`);
    } catch (error) {
        console.error('Error Registering /cmds:', error);
    }
}

// Handle Interaction
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    // Check if /cmds is being called
    if (commandName === 'cmds') {
        const responseEmbed = new MessageEmbed()
            .setColor('#61ffcd')
            .setTitle('**Commands**')
            .setThumbnail('https://o.remove.bg/downloads/67383a00-15cd-44ea-83ab-1a3099bcb7c9/New_Project-removebg-preview.png')
            .addField('/cmds', 'Opens my command menu.');

        await interaction.reply({ embeds: [responseEmbed] });
    }
});

// Log the bot in
client.login(process.env.TOKEN);

// Export the client
module.exports = client;

