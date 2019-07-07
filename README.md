# discord-bot-analytics
Record discord bot analytics with ease


# Getting started
To first get started you will need a key to use https://api.chewey-bot.ga/ (Free)


If you are using Discord.js or Eris then this module is already built with full auto reporting

To get started 
```
const cheweyBotAnalyticsAPI=require("discord-bot-analytics")
const customAnalytics = new cheweyBotCustomAPILib("YOUR API TOKEN", discordBot)
```
If you using Discord.js or Eris then thats all you rreporting is setup

# How to access my analytics
Webdash board (soon)

Get all stats for chart (fetch every 5 minutes)
https://api.chewey-bot.ga/analytics/getall/YOUR-USERID

Getting latest (fetch every minute)
https://api.chewey-bot.ga/analytics/getlatest/YOUR-USERID

# What can I track
Currently supported: servers, users, channels, sent messages, received messages, Ram

# Details
Analytics are reported at 10minute intervals and stored forever (Details below)

As time goes on the stats will become more aggregated when stored on the server (Up per day stats)
    This is so more data can be held longer giving better insight to your bot
    As you may not care about per hour data from 6 months ago hence as time goes it might be compressed to for that day

# Whats the catch
There is none as long as I can pay the bills then this service will be free 
Want like the service or want to help out then checkout https://www.patreon.com/CheweyZ

Perks coming soon: Higher resolution data (per minute)