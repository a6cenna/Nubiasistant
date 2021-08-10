const { execute } = require("./ping");

module.exports = {
    name:"serverinfo",
    aliases:['si'],
    execute(msg, args) {
        const embed = {
            color: 0xCCFF00,
            title: `**${msg.guild.name}**`,
            

            
        }
        msg.channel.send({ embed: embed })
    }
}