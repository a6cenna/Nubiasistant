const { aliases, execute } = require("./configcom")
module.exports = {
    name: "report",
    cooldown: 3600,
    execute(msg, args, ThoriZ){
        if (!args.length) {
            msg.reply('hey its fake report >:(')
        }else {
            msg.channel.send(ThoriZ)
            msg.reply('Thank you for reporting')
        }
        
    }
}