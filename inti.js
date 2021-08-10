const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const config = require('./pengaturan.json')
const prefix = config.prefix
const cooldowns = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}


client.once('ready', () => {
	console.log('hello world');
    client.user.setActivity('type )help')
});

client.on('message', msg => {
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

    if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return msg.reply(`please wait ${timeLeft.toFixed(1)}seconds to use the \`${command.name}\` command.`).then(msg => {
                timestamps.set(msg.author.id, now);
                setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
            })
        }
    }
    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
    
    try {
        command.execute(msg, args);
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

client.login(config.token);