const profileModel = require('../models/profileSchema');
module.exports = {
    name: "pray",
    aliases: [ 'doa' ],
    cooldown: 30,
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
        const kesempatan = Math.floor(Math.random() * 5) + 1;
        const randomNumber = Math.floor(Math.random() * (1700 - 600)) + 600;
        const embed = {
            color: 0xCCFF00,
            title: `Praying`,
            description: `Kamu berdoa, lalu seseorang datang dan memberi mu ${randomNumber} Toins`
        }
        const embed1 = {
            color: 0xCCFF00,
            title: `Praying`,
            description: `kamu sudah berdoa, tapi usahamu kurang keras :(`
        }
        if (kesempatan > 3) {
            console.log(kesempatan)
            const response = await profileModel.findOneAndUpdate(
                {
                    userID: msg.author.id,
                },  {
                        $inc: {
                        coins: randomNumber,

                        },
                    }
            );
            msg.reply({ embed: embed })
        }else {
            msg.reply({ embed: embed1 })
        }
        
        
    }

}