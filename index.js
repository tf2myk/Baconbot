const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const talkedRecently = new Set();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}




client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {



if (talkedRecently.has(message.author.id) && message.content.startsWith(prefix))  {
	message.channel.send(`Please wait 3 seconds before using the bot again, ${message.author}`);
	return;
} else if(message.author.id != 'myk#0135') {

	   // the user can type the command ... your command code goes here :)

	// Adds the user to the set so that they can't talk for a minute
	talkedRecently.add(message.author.id);
	setTimeout(() => {
	  // Removes the user from the set after a minute
	  talkedRecently.delete(message.author.id);
	}, 6000);
}

if (!message.member.roles.cache.some(role => role.name === 'pugger') && !message.author.bot && message.content.startsWith(prefix)) {
	message.channel.send(`${message.author} must be a registered pugger to use the pugbot`)
	return;
}



if (!message.content.startsWith(prefix) || message.author.bot) return;
const args = message.content.slice(prefix.length).trim().split(/ +/);
const command = args.shift().toLowerCase();


if (!client.commands.has(command)) return;

try {
	client.commands.get(command).execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}


});


client.login(token);