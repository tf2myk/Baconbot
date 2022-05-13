var mysql      = require('mysql');
const fetch = require('node-fetch');
const { steamapi } = require('../config.json');
const Parser = require('../class/idclass');

module.exports = {
	name: 'leaderboard',
	description: 'display leaderboard with dynamic string',
	execute(message, args) {
        
        var found = false;
        var obj;
        var thecount;
        var totalcount;
        

       

        
        

        var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database : 'baconpugsdb'
        });

        

        con.connect(function(err) {
            if (err) throw err;
            

            con.query(`SELECT COUNT(*) AS 'thecount' from playerlist`, function (err, result, fields)
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

                    }

                })

                con.query(`SELECT * from playerlist ORDER by Wins DESC`, function (err, result, fields)
                {
                  if (err) 
                    {
                        message.channel.send(`Eror: ${err.code}`);
                        return; 
                    }
                    else 
                    {
                        var test = '\`\`\`Alias |  Wins  |  Pugs  |\n\n';
                        for(var k = 0; k < totalcount; k++)
                        {
                            test = test + `${result[k].Alias} \n ---      ${result[k].Wins}        ${result[k].Pugs}\n`
                        }

                        test = test + '\`\`\`'
                        message.channel.send(test);
                      

                    }

                   

                })





        });
            
        
    

	},
};


