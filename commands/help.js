module.exports = {
    name: 'help',
    execute(msg, args) {
       const embed = {
           color: 0xCCFF00,
           title: "Commands:",
           author: {
               name:"Nubiasistant"
           },
           fields: [
               {
                   name:"**Update**",
                   value:"always check for update"
               },
               {
                   name:"\u200b",
                   value:"\u200b",
                   inline:false
               },
               {
                   name: "**Config**",
                   value: "for all list of server settings",
                   inline: true
               },
               {
                   name:"**Uconfig**",
                   value:"for all list of user config",
                   inline: true
               },
               {
                   name:"**Tool**",
                   value:"for many tools",
                   inline: true
               }
           ]

        }
        msg.channel.send({ embed: embed })

    }


}