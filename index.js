const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
bot.on("ready", async () => {
 console.log(`${bot.user.username} is online!`);

bot.user.setActivity("Use ?help",{type: "PLAYING"});
});

});
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
    
  }
});
client.login(process.env.BOT_TOKEN);
      
    
