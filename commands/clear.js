
module.exports = {
	name: 'clear',
	description: 'clears chat',
	execute(message, args) {
        


        var whodidit = message.author.username;
        console.log(whodidit);
        const id = message.author.tag
        if(id != 'myk#0135' && id != 'baocn#8569')
        {
          message.channel.send(`\`\`\` must be bacon or myk to clear chat: ${id} \`\`\``);
        }

        if (!args.length  ) {
            return message.channel.send(`\`\`\`Message deletion requires an amount\n Ex: Clear 5\`\`\``);
        }
        

        message.channel.bulkDelete(args[0])
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error);
        
        //message.channel.send(`\`\`\` Chat cleared by ${whodidit} \`\`\``);

		return;
    

        
            
        
    

	},
};


