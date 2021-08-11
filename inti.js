const profileModel = require('./models/profileSchema');
const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const config = require('./pengaturan.json');
const prefix = config.prefix;
const mongodbServer = config.mongodb_server;
const cooldowns = new Discord.Collection();
const mongoose = require('mongoose');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}


client.once('ready', () => {
	console.log('Hi, my genius developer!');
    console.log(mongodbServer);
    client.user.setActivity('type )help')
});

client.on('guildMemberAdd', async member => {
    try{
        profileData = await profileModel.findOne({ userID: msg.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: member.id,
                serverID: member.guild.id,
                coins: 1800,
                bank: 0,
            });
            profile.save()
        }
    }catch(err){
        console.log(err)
    }
})

client.on('message', async msg => {
    if(!msg.guild) return;
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const isi = args.join(' ')
    
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) return;
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

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
        }
    }catch(err){
        console.log(err)
    }

    if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return msg.reply(`Tolong tunggu ${timeLeft.toFixed(1)} detik untuk menggunakan perintah \`${command.name}\`.`).then(msg => {
                timestamps.set(msg.author.id, now);
                setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
            })
        }
    }
    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
    
    try {
        command.execute(msg, args, command, client, Discord);
    } catch (error) {
        console.error(error);
	    msg.reply('sorry there is an error');
    }
    if (commandName === 'report') {
        if (!args.length){
            msg.channel.send('')
        }else {
            const ThoriZ = client.users.cache.get('706319390307516489').send(`<@${msg.author.id}> report: ${isi}`)
            msg.guild
        }
        
    }

});

client.on('message', (msg) => {
    if(!msg.guild) return;
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
})

mongoose.connect(mongodbServer, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() =>{
    console.log("Sukses menyambungkan ke database!")
}).catch((error) => {
    console.log(error);
});

client.login(config.token);