var mysql      = require('mysql');
const fetch = require('node-fetch');
const { steamapi } = require('../config.json');
const Parser = require('../class/idclass');

module.exports = {
	name: 'rank',
	description: 'show pug info',
	execute(message, args) {
        
        var found = false;
        var obj;
        var winpercentage = 0;
        var totalcount;
        var rankarray = [] ;
        var name = args[0];


        const id = message.author.tag

        if (!args.length  ) {
            return message.channel.send(`\`\`\`Use !rank (alias) to look up pug stats\n Ex: !rank myk\`\`\``);
        }
        else if(args[0].includes("U:"))
        {
            return message.channel.send(`Invalid name, ${message.author} \n Make sure ur using an alias`);
        }
        


		
    

        var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database : 'baconpugsdb'
        });

        

        con.connect(function(err) {
            if (err) throw err;


            con.query(`SELECT COUNT(*) AS thecount from playerlist`, function (err, result, fields)
                {
                  if (err) 
                    {
                        message.channel.send(`Eror: ${err.code}`);
                        return; 
                    }
                    else 
                    {
                      console.log(`The total in database count returned was ${result[0].thecount}`);
                      totalcount = result[0].thecount;

                      if(result[0].thecount == 0)
                      {
                        message.channel.send(`Couldnt find that user in the datbase, probably didnt add yet`);
                      }
                      
                    }
                })

            
            con.query(`SELECT * from playerlist ORDER by Wins DESC`, function (err, result, fields)
            {
              if (err) 
              {
                  message.channel.send(`Eror: ${err.code} \n Probably didnt add to the pugbot`);
                  return; 
              }
              if(!result)
              {
                message.channel.send(`Eror: ${err.code} \n Probably didnt add to the pugbot`);
              }
              
              
                for(var k = 0; k < totalcount; k++)
                {
                    
                    
                    if(result[k].Alias == name)
                    {
                        if(result[k].Wins > 0)
                        {
                            winpercentage = Math.floor((result[k].Wins / result[k].Pugs) * 100)
                        }
                        
                        message.channel.send(`\`\`\`${result[k].Alias}:\n \n Wins: ${result[k].Wins}\n Pugs ${result[k].Pugs} \n Win% = ${winpercentage}%\n Rank: #${k+1}  \n \`\`\``);
                        return;

                        
                    }
                    
                
                
            }
            
            })

              ; 
            
          });


        
        //message.channel.send(`${message.author} added to leaderboard`);
	},
};


