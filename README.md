# discord-bot-analytics
Record discord bot analytics with ease


# Getting started
To first get started you will need a key to use https://api.chewey-bot.top/ (Free)
Click on any endpoint to view the steps on getting a token


If you are using Discord.js or Eris then this module is already built with full auto reporting

To get started 
```
const cheweyBotAnalyticsAPI=require("discord-bot-analytics")
const customAnalytics = new cheweyBotAnalyticsAPI("YOUR API TOKEN", discordBot)
```
If you using Discord.js or Eris then thats all you reporting is setup

# How to access my analytics
Webdash board (Very Simple)
https://cheweyz.github.io/discord-bot-analytics-dash/index.html?id=YOU-USERID
(Your UserID is your personal one NOT your botID)

Demo: https://cheweyz.github.io/discord-bot-analytics-dash/index.html?id=220625669032247296

Get all stats for chart (fetch every 5 minutes)
https://api.chewey-bot.top/analytics/getall/YOUR-USERID

Getting latest (fetch every minute)
https://api.chewey-bot.top/analytics/getlatest/YOUR-USERID

# Demo Bot
The following is an example for Eris
```
const Eris = require("eris");

const bot = new Eris("BOT_TOKEN");

/* Simply add these 2 lines to start tracking */
const cheweyBotAnalyticsAPI=require("discord-bot-analytics")
const customAnalytics = new cheweyBotAnalyticsAPI("YOUR API TOKEN", bot)

bot.on("ready", () => {
    console.log("Ready!");
});

bot.on("messageCreate", (msg) => {
    if(msg.content === "!ping") {
        bot.createMessage(msg.channel.id, "Pong!");
    }
});

bot.connect(); // Get the bot to connect to Discord
```

Discord.js
```
const Discord = require('discord.js');
const client = new Discord.Client();

/* Simply add these 2 lines to start tracking */
const cheweyBotAnalyticsAPI=require("discord-bot-analytics")
const customAnalytics = new cheweyBotAnalyticsAPI("YOUR API TOKEN", client)

client.on('ready', () => {
  console.log(`Ready!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('token');
```

# What can I track
Currently supported: servers, users, channels, sent messages, received messages, Ram

# Details
Analytics are reported at 10minute intervals and stored forever (Details below)

As time goes on the stats will become more aggregated when stored on the server (Up per day stats)
    This is so more data can be held longer giving better insight to your bot
    As you may not care about per hour data from 6 months ago hence as time goes it might be compressed to for that day

# Whats the catch
There is none as long as I can pay the bills then this service will be free 
Like the service or want to help out then checkout https://www.patreon.com/CheweyZ

Perks coming soon: Higher resolution data (per minute)