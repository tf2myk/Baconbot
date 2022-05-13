module.exports = {
	name: 'commands',
	description: 'display commands',
	execute(message, args) {
		


    
        message.channel.send(`\`\`\`List of currently working commands\n !Add (Adds to leaderboard)\n !clear (clear the chat)\n !pugwin (add a recent pug to the database)\n !pugrevert(revert a pug)\n !rank (shows ranking) \n !top (shows top stats) \n !leaderboard (shows everyones stats)\n !stats (shows player stats) \`\`\` `);
	},
};