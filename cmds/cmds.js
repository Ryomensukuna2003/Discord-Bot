require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const commands = [
  {
    name: 'create',
    description: 'Creates a short url',
  },
  {
    name:"Ping",
    description:"Replies with Pong",
  },
];

const clientId = process.env.CLIENT;
const token = process.env.TOKEN;
const guild=process.env.GUILD

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId,guild),
      {
        body: commands,
      }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
