var mysql      = require('mysql');
const fetch = require('node-fetch');
const { steamapi } = require('../config.json');
const Parser = require('../class/idclass');

module.exports = {
	name: 'add',
	description: 'add to databse',
	execute(message, args) {
        
        var found = false;
        var obj;

        if (!args.length  ) {
            return message.channel.send(`\`\`\`To add to the leaderboards use the format: !add (alias) (SteamID3) \nSteamID3Finder: https://steamid.xyz/  \nExample: !add myk U:1:78753744\n Your alias will be case-sensitive.\`\`\``);
        }

        if(!args[1])
        {
            return message.channel.send(`Invalid steam id, ${message.author} \n Make sure you included your SteamID3`);
        }

        if(!args[1].includes("U:"))
        {
            return message.channel.send(`Invalid steam id, ${message.author} \n Make sure ur using SteamID3`);
        }

        if(args[1].includes("]"))
        {
            args[1] = args[1].replace(']', '');
            
        }

        if(args[1].includes("["));
        {
            args[1] = args[1].replace('[','');
        }

        console.log(args[1]);


        if(args[0].includes(":"))
        {
            return message.channel.send(`Invalid steam id, ${message.author} \n Are you putting your name first then the steamid?`);
        }


        


		
    

        var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database : 'baconpugsdb'
        });

        

        con.connect(function(err) {
            if (err) throw err;


            con.query(`insert into playerlist(Alias, userID) VALUES('${args[0]}', '[${args[1]}]')`, function (err, result, fields) {
              if (err)
              {
                message.channel.send(`Eror: ${err.code}`);
                return; 
              }
              else
              {
                con.query(`SELECT Alias, userID FROM playerlist where Alias = '${args[0]}'`, function (err, result, fields) {
                    if (err) 
                    {
                        message.channel.send(`Eror: ${err.code}`);
                        return; 
                    }
                    else 
                    {
                        message.channel.send(`\`\`\`Alias: ${result[0].Alias} \n Steam3ID: ${result[0].userID} \n Added to the database \`\`\``);
                    }
                  
                  });
              }

            
            });

            
          });

              
        

        
        

        
    
        
        //message.channel.send(`${message.author} added to leaderboard`);
	},
};


/*
        const parser = new Parser(process.env.STEAM_API_KEY || steamapi, { // Options object are set by default to these values
            checkForAccountID: false,
            checkNumberForVanity: true
        });

        parser.get(args[0])
        .then(res => {
            //console.log(res);
            console.log(res.accountid);
            //console.log('res', res);
        })
        .catch(err => {
            console.log('err', err);
        });
        */
        // Gives a universal steam id?

/*
        if (!args.length || args[0].includes("https://steamcommunity.com/id/")  ) {
            
            found = true;
        }
        else if((args.length || args[0].includes("https://steamcommunity.com/profiles/")))
        {
            found = true;
        }
        
        if(!found)
        {
            return message.channel.send(`Invalid steam id, ${message.author}!`);
        }
        */