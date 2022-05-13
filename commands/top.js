var mysql      = require('mysql');
const fetch = require('node-fetch');
const { steamapi } = require('../config.json');
const Parser = require('../class/idclass');


module.exports = {
	name: 'top',
	description: 'display leaderboard',
	execute(message, args) 
	{
		if(!args.length)
		{
			message.channel.send(`\`\`\`!leaderboard shows a full collection of everyone added to the bot\n Use !top to view the 5 or 10 rankings \n    Ex: !top 10  \`\`\``);
			return;
		}

		if(args[0] != 5 && args[0] != 10)
		{
			message.channel.send(`\`\`\`Need to specify between top 5 or top 10 leaderboards \n Ex: !top 5 \`\`\``);
			return;
		}

		var myData = [];
		var counter;


		var con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "password",
			database : 'baconpugsdb'
		});





		con.connect(function(err) //NO CHECKING FOR ENOUGH PLAYERS TO DISPLAY
		{
			if (err) throw err; // initial error


			con.query(`SELECT COUNT (*) AS thecount from playerlist`, function (err, result, fields)
                {
                  if (err) 
                    {
                        message.channel.send(`Eror: ${err.code}`);
                        return; 
                    }
                    else 
                    {
                      console.log(`The count returned was ${result[0].thecount}`);
					  counter = result[0].thecount;

                    }
                })

				con.query(`Select * from playerlist ORDER BY Wins DESC`, function (err, result, fields)
                {
                  if (err) 
                    {
                        message.channel.send(`Eror: ${err.code}`);
                        return; 
                    }

var top5 = 
`\`\`\`NAME       |    WINS   |  RANK\n  
${result[0].Alias}\n---              ${result[0].Wins}         #1   
${result[1].Alias}\n---              ${result[1].Wins}         #2   
${result[2].Alias}\n---              ${result[2].Wins}         #3   
${result[3].Alias}\n---              ${result[3].Wins}         #4   
${result[4].Alias}\n---              ${result[4].Wins}         #5   
\`\`\``;
					
							var top10 = 
`\`\`\`NAME       |    WINS   |  RANK\n  
${result[0].Alias}\n---              ${result[0].Wins}         #1   
${result[1].Alias}\n---              ${result[1].Wins}         #2   
${result[2].Alias}\n---              ${result[2].Wins}         #3   
${result[3].Alias}\n---              ${result[3].Wins}         #4   
${result[4].Alias}\n---              ${result[4].Wins}         #5   
${result[5].Alias}\n---              ${result[4].Wins}         #6   
${result[6].Alias}\n---              ${result[5].Wins}         #7   
${result[7].Alias}\n---              ${result[5].Wins}         #8   
${result[8].Alias}\n---              ${result[5].Wins}         #9   
${result[9].Alias}\n---              ${result[5].Wins}         #10   
\`\`\``;
                    
				  	if(args[0] == '5')
				  	{
						message.channel.send(top5);
		  		  	}	

					if(args[0] == '10')
					{
						message.channel.send(top10);
					}	
				})




		});









		
		
		

	},
};