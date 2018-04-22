const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const fs = require("fs");
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);

    bot.user.setActivity("Use ?help", { type: "PLAYING" });

  });

});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
   let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);

  if (cmd === `${prefix}welcome`) {
    return message.channel.send(`To make the welcome message work make sure the name is welcome-leave in order for it to work!`);

  }
  if (cmd == `${prefix}info`) {
    let infoEmbed = new Discord.RichEmbed()
    let helpembed = new Discord.RichEmbed()
      .setTitle("Info Section")
      .setDescription("Just some info")
      .setColor("#f909d5")
      .addField("Name", "AbbyRose")
      .addField("Server support", "https://discord.gg/h6vMPxP")
      .addField("Owners of the bot", "Itachi#0460, [YT] Paradox Python#2570")
      .addField("Coder ", "Itachi#0460")
    message.delete().catch();
    message.channel.send(helpembed)
  
  }
    });
client.login(process.env.BOT_TOKEN);
