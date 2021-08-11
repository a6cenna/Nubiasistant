const profileModel = require('../models/profileSchema');
module.exports = {
    name: "balance",
    aliases: [ 'bal', 'bl' ],
    async execute(msg, args, command, client, Discord, discord){
        let profileData;
        try{
            profileData = await profileModel.findOne({ userID: msg.author.id })
            
            if (!profileData) {
                let profile = await profileModel.create({
                    userID: msg.author.id,
                    serverID: msg.guild.id,
                    coins: 1800,
                    bank: 0,
                });
                profile.save()
                msg.channel.send("tolong tulis command ini kembali")
            }
        }catch(err){
            console.log(err)
        }
        const embed = {
            color: 0xCCFF00,
            title: `${msg.author.username} balance`,
            description: `:coin: **Toins**: ${profileData.coins} \n` +
            `**:bank: TWorld Bank**: ${profileData.bank} \n` 
        }
        msg.channel.send({ embed: embed })
    }

}