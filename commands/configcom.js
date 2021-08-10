module.exports = {
    name: "config",
    aliases: ['con', 'settings'],
    execute(msg, args) {
        const embed = {
            color: 0xCCFF00,
            title: "Server Commands:",
            author: {
                name:'Nubiasistant'
            },
            description: '1. `server-info` \n' +
            'for info of your server \n' +
            ' \n'+
            '2. `server-name` \n' +
            'to change your server name'
        }
        msg.channel.send({ embed: embed })
    }
}