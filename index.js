require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const api = "https://url-shortner-9mrd.onrender.com/url";

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("Shorten")) {
    const URL = message.content.split(" ")[1];

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: URL,
        }),
      });

      if (!response.ok) {
        console.error("Error:", response.status, response.statusText);
        message.reply("An error occurred while shortening the URL.");
        return;
      }

      const result = await response.json();
      const shortLink = `https://url-shortner-9mrd.onrender.com/${result.id}`;

      console.log(result);
      message.reply(`Shortened URL: ${shortLink}`);
    } catch (error) {
      console.error("Error:", error.message);
      message.reply("An unexpected error occurred.");
    }
  } else {
    message.reply("Faltu Message mat type kar");
  }
});

client.login(process.env.TOKEN);

// require("dotenv").config();
// const {
//   Client,
//   Collection,
//   GatewayIntentBits,
//   Message,
//   ChatInputCommandInteraction,
//   messageLink,
// } = require("discord.js");
// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent,
//   ],
// });

// const api="https://url-shortner-xozo.onrender.com/url";

// client.once("ready", () => {
//   console.log("Bot is ready!");
// });

// client.on("messageCreate",async (message) => {
//   if (message.author.bot) return;
//   if(message.content.startsWith("Shorten")){
//     const URL=message.content.split(' ')[1];
//     const response=await fetch(api,{
//       method:'POST',
//       headers:{
//         'Content-Type': 'application/json',
//       },
//       body:JSON.stringify({
//         url:URL
//       })
//     })
//     const result=await response.json();
//     console.log(result);
//   }
//   else{
//     message.reply("Faltu Message mat type kar");
//   }
// });

// client.login(process.env.TOKEN);
