var mysql      = require('mysql');
const fetch = require('node-fetch');
const { steamapi } = require('../config.json');
const Parser = require('../class/idclass');

module.exports = {
	name: 'delete',
	description: 'delete from database',
	execute(message, args) {
        
        var found = false;
        var obj;
        var thecount;
        var totalcount;

        const id = message.author.tag
        if(id != 'myk#0135' && id != 'baocn#8569')
        {
          message.channel.send(`\`\`\` must be bacon or myk to delete from db, id found was: ${id} \`\`\``);
        }

        if (!args.length  ) {
            return message.channel.send(`\`\`\`To delete someone from the database use: !delete (alias)\`\`\``);
        }
        else if(args[0].includes("U:"))
        {
            //return message.channel.send(`Invalid name, ${message.author} \n Make sure ur using an alias`);
        }
        

        var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database : 'baconpugsdb'
        });

        

        con.connect(function(err) {
            if (err) throw err;
            con.query(`DELETE FROM playerlist WHERE Alias = '${args[0]}'`), function (err, result, fields) 
            {
                if (err) 
                {
                    message.channel.send(`Eror: ${err.code}`);
                    return; 
                }
                else 
                {
                    message.channel.send(`\`\`\`Alias: ${args[0]} \n Deleted from the database \`\`\``);
                    return;
                }
              
            }

            con.query(`SELECT COUNT(*) AS 'thecount' from playerlist where Alias = '${args[0]}'`, function (err, result, fields)
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
                        message.channel.send(`\`\`\`Alias ${args[0]} \ndeleted from database \`\`\``);
                      }
                      
                    }
                })





        });
            
        
    

	},
};


