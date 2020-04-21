const https = require('https')

/**
 * @typedef AnalyticData
 * @property {Number} servers
 * @property {Number} users
 * @property {Number} channels
 * @property {Number} sent_messages
 * @property {Number} received_messages
 * @property {Number} ram_used
 */

class Analytics{
    /**
     * @param {String} apiToken Chewey Bot api Token
     * @param {import("eris").Client | import("discord.js").Client} discordBot (recommended) optional if want auto reporter (stats recorded for you)
     */
    constructor(apiToken,discordBot){
        this.options={
            apiToken,
            discordBot:discordBot,
            sent_messages:0,
            received_messages:0
        }
        if(discordBot!=null){
            discordBot.on("messageCreate",(msg)=>{
                this.options.received_messages++;
                if(msg.author.id==discordBot.user.id){
                    this.options.sent_messages++;
                }
            })
            discordBot.on("message", (msg) => {
                this.options.received_messages++;
                if (msg.author.id == discordBot.user.id) {
                    this.options.sent_messages++;
                }
            })
            // allow bot to warmup
            discordBot.on("ready",()=>{
                setTimeout(() => {
                    this.startAutoReport()
                    // send initial on load
                    this.sendReport(this.buildBody(this.options.discordBot)).then(() => {}, () => {})
                }, 10000);
            })
        }
    }

    /**
     * Start auto reporting - only used if discordBot Client provided
     */
    startAutoReport(){
        if (this.options.discordBot && !this.options.interval) {
            this.options.interval = setInterval(() => {
                this.sendReport(this.buildBody(this.options.discordBot)).then(() => {}, () => {}) //ignore auto errors
            }, 10.1 * 60 * 1000); //10minute + extra to ensure clean limits
        }
    }

    /**
     * Stop auto reporting - to start again use startAutoReport()
     */
    stopAutoReport(){
        if (this.options.interval){
            clearInterval(this.options.interval)   
            delete this.options.interval
        }
    }

    /**
     * Used to auto construct the body to send
     * @param {@param {import("eris").Client | import("discord.js").Client} discordBot} discordBot
     * @returns {AnalyticData}
     */
    buildBody(discordBot){
        // Eris : Discord.js
        let channelCount = discordBot.channelGuildMap ? Object.keys(discordBot.channelGuildMap).length : discordBot.channels.cache.size
        let reply= {
            servers:discordBot.guilds.size?discordBot.guilds.size:discordBot.guilds.cache.size,
            users:discordBot.users.size?discordBot.users.size:discordBot.users.cache.size,
            channels:channelCount,
            sent_messages:this.options.sent_messages,
            received_messages: this.options.received_messages,
            ram_used:process.memoryUsage().rss //not true usage but is true ram consumption by pc spec
        }
        this.options.sent_messages=0;
        this.options.received_messages=0;
        return reply
    }
    /**
     * @param {AnalyticData} body
     * @returns {Promise<String|null>}
     */
    sendReport(body){
        // console.log("Sending rep",body);
        return httpsPost(body,this.options.apiToken)
    }
}
function httpsPost(body,auth){
    return new Promise((resolve,reject)=>{
        const data = JSON.stringify(body)
        const options = {
            hostname: 'api.chewey-bot.top',
            port: 443,
            path: '/analytics/post',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'Authorization': auth
            }
        }
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', function (d) {
                body += d;
            });
            res.on("end",()=>{
                try{
                    body=JSON.parse(body)
                }catch(e){}
                if(res.statusCode!=200){
                    console.log("Report stats Chewey Bot API error ",body);
                }
                resolve(body)
            })
        })
        
        req.on('error', (error) => {
            console.error("Report stats Chewey Bot API Error",error)
            reject(error)
        })
        
        req.write(data)
        req.end()

    })
}


module.exports=Analytics
