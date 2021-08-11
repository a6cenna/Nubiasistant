const profileModel = require('../models/profileSchema');
module.exports = {
    name: "deposit",
    aliases: [ 'dep', 'dp' ],
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
        const amount = args[0];
        if (amount % 1 != 0 || amound <= 0) return msg.channel.send('Hey, kamu tidak bisa mendepositkan itu');
        try {
            if (amount > profileData.bits) return msg.channel.send("Lel kau tidak bisa menipuku, uangmu tidak sebanyak itu");
            await profileModel.findOneAndUpdate({
                userID: msg.author.id
            }, {
                $inc: {
                    bits: -amount,
                    bits: amount,
                },
            }
            )
            return msg.rep
        } catch (error) {
            console.log(error)
        }
    },
}