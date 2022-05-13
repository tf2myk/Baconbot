var mysql      = require('mysql');
const fetch = require('node-fetch');
const { steamapi } = require('../config.json');
const Parser = require('../class/idclass');

module.exports = {
	name: 'pugwin',
	description: 'do !pugwin (logid) (teamname) to give a pugwin',
	async execute (message, args) 
  {

    const id = message.author.tag
   if(id != 'myk#0135' && id != 'baocn#8569')
   {
      message.channel.send(`\`\`\` must be bacon or myk to add pugwins id found was ${id} \`\`\``);
      return;
   }

   if(!args.length)
   { 
     message.channel.send(`\`\`\`  !pugwin (logid) (BLUE/RED) to give a pugwin \n Ex: !pugwin https://logs.tf/2905262#76561198039019472 Blue \`\`\``);
     return;
   }
   /*
   if(!args[1])
   {
     message.channel.send(`\`\`\`  !pugwin (logid) (BLUE/RED) to give a pugwin \n Ex: !pugwin https://logs.tf/2905262#76561198039019472 Blue \`\`\``);
     return;
   }
   */

   if(!args[0].includes('logs.tf'))
    {
      message.channel.send(`\`\`\` the pug linked wasnt found in the api use format\n https://logs.tf/2905262#76561198039019472   \`\`\``);
      return;
    }
    /*
    var teamwon = args[1];
    teamwon = teamwon.charAt(0).toUpperCase() + teamwon.slice(1)
    
    if(!teamwon.includes('Blue') && !teamwon.includes('Red'))
    {
      message.channel.send(`\`\`\` Must specify a team who won   \`\`\``);
      return;
    }
    */
    
    var winlist = []; //holds winners
    var totalplayers = [];
    var withoutmedplayers = [];
    var onlymedplayers = [];     
    var counter;
    //thedate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    var url = args[0];
    var parts = url.split('/').splice(2);
    //console.log(parts);
    var apiurl = 'http://logs.tf/api/v1/log/' + parts[1]
    var winnercount;


    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database : 'baconpugsdb'
    });





    var logobj = await fetch(apiurl).then(response => response.json());
    
    if(logobj.teams.Red.score > logobj.teams.Blue.score)
    {
      teamwon = 'Red'; 
    }
    else
    {
      teamwon = 'Blue';
    }
    
    for ( var steamid in logobj.names ) 
    {
      var k = 0;
      totalplayers.push(steamid);
      if(logobj.players[`${steamid}`].team == teamwon)
      {
        winlist.push(steamid);
      }

      if(logobj.players[`${steamid}`].class_stats[k].type != 'medic')
      {
        withoutmedplayers.push(steamid);
      }
      else
      {
        onlymedplayers.push(steamid);

      }
      
      k++;
    
    }

  

    con.connect(function(err) 
    {  
      if (err) return err; //Initial connection error

      con.query(`SELECT COUNT(*) AS thecount from playerlist where userID = '${totalplayers[0]}' OR userID = '${totalplayers[1]}' OR userID = '${totalplayers[2]}' OR userID = '${totalplayers[3]}' OR userID = '${totalplayers[4]}' OR userID = '${totalplayers[5]}' OR userID = '${totalplayers[6]}' OR userID = '${totalplayers[7]}' OR userID = '${totalplayers[8]}' OR userID = '${totalplayers[9]}' OR userID = '${totalplayers[10]}' OR userID = '${totalplayers[11]}'`, function (err, result, fields)
      {
        if (err) 
        {
          message.channel.send(`Eror: ${err.code}`);
          return; 
        }
        console.log(result[0].thecount); 

        if(result[0].thecount < 12)
        {
          message.channel.send(`\`\`\`Bot didnt find 12 people to give credit to.\n Someone probably didnt add to the pugbot\`\`\``);
          con.destroy();

          if(err)
          {
            message.channel.send(`Eror: ${err.code}`);
            return; 
          }
        }
      

      })

      con.query(`UPDATE \`baconpugsdb\`.\`playerlist\` SET \`Wins\` = Wins+1  where userID = '${winlist[0]}' OR userID = '${winlist[1]}' OR userID = '${winlist[2]}' OR userID = '${winlist[3]}' OR userID = '${winlist[4]}' OR userID = '${winlist[5]}'`, function (err, result, fields)
      {
        if (err) 
        {
          message.channel.send(`Eror: ${err.code}`);
            return; 
        }
        
        console.log('Sucessfuly updated DB with wins');
        
      })

      con.query(`UPDATE \`baconpugsdb\`.\`playerlist\` SET \`Pugs\` = Pugs+1  where userID = '${totalplayers[0]}' OR userID = '${totalplayers[1]}' OR userID = '${totalplayers[2]}' OR userID = '${totalplayers[3]}' OR userID = '${totalplayers[4]}' OR userID = '${totalplayers[5]}' OR userID = '${totalplayers[6]}' OR userID = '${totalplayers[7]}' OR userID = '${totalplayers[8]}' OR userID = '${totalplayers[9]}' OR userID = '${totalplayers[10]}' OR userID = '${totalplayers[11]}'`, function (err, result, fields)
      {
        if (err) 
        {
            message.channel.send(`Eror: ${err.code}\n Someone probably didnt add`);
            return; 
        }
        console.log('Sucessfuly updated DB with Pugs');
      
      })

      con.query(`SELECT Alias from playerlist where userID = '${winlist[0]}' OR userID = '${winlist[1]}' OR userID = '${winlist[2]}' OR userID = '${winlist[3]}' OR userID = '${winlist[4]}' OR userID = '${winlist[5]}'`, function (err, result, fields)
      {
        if (err) 
        {
            message.channel.send(`Eror: ${err.code} \n Someone probably didnt add to the pugbot`);
            return; 
        }
        else 
        {

          message.channel.send(`\`\`\`Pug Winners:\n ${result[0].Alias}, \n ${result[1].Alias}, \n ${result[2].Alias}, \n ${result[3].Alias}, \n ${result[4].Alias}, \n ${result[5].Alias}\nHave been given credit \n DPM and medpugs updated \`\`\``);
        }
      
      })

      con.query(`UPDATE playerlist SET medpugs = medpugs + 1  where userID = '${onlymedplayers[0]}' OR userID = '${onlymedplayers[1]}'`, function (err, result, fields)
      {
        if (err) 
        {
          message.channel.send(`Eror: ${err.code}`);
            return; 
        }
        
        console.log(`medpugs Set for ${onlymedplayers[0]} and ${onlymedplayers[1]}`);
        
      })

      for ( var steamid in logobj.names ) 
      {

        if(steamid != onlymedplayers[0] && steamid != onlymedplayers[1])
        {
          console.log(logobj.players[`${steamid}`].deaths)
          
          con.query(`UPDATE \`baconpugsdb\`.\`playerlist\` SET \`deaths\` = (deaths + ${logobj.players[`${steamid}`].deaths})  where userID = '${steamid}'`, function (err, result, fields)
          {
            if (err) 
            {
              message.channel.send(`Eror: ${err.code}`);
                return; 
            }
          })
        }

      }
      console.log('deaths set');

      

      for ( var steamid in logobj.names ) 
      {
        if(steamid != onlymedplayers[0] && steamid != onlymedplayers[1])
        {
          
          con.query(`UPDATE \`baconpugsdb\`.\`playerlist\` SET \`kills\` = (kills + ${logobj.players[`${steamid}`].kills})  where userID = '${steamid}'`, function (err, result, fields)
          {
            if (err) 
            {
              message.channel.send(`Eror: ${err.code}`);
                return; 
            }

          })
        }

      }

      console.log('kills set');


      for ( var steamid in logobj.names ) 
      {
        if(steamid != onlymedplayers[0] && steamid != onlymedplayers[1])
        {
          con.query(`UPDATE \`baconpugsdb\`.\`playerlist\` SET \`dpm\` = (dpm + ${logobj.players[`${steamid}`].dapm})  where userID = '${steamid}'`, function (err, result, fields)
          {
            if (err) 
            {
              message.channel.send(`Eror: ${err.code}`);
                return; 
            }
            
            
          })

        }
        
        
      }

      console.log('dpm set');


    });


    





       
	},
};


