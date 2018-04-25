const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  bot.user.setActivity("Use ?help",{type: "PLAYING"});
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
    
  }
});
client.login(process.env.BOT_TOKEN);
      
    
