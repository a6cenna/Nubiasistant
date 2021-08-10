module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(msg, args) {
		msg.channel.send(`Pong! **${Math.floor(Date.now() - msg.createdTimestamp)}ms**.`);
	},
};