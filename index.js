const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f}loaded!`);
    bot.commands.set(props.help.name, props)
  });

  
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
   if (cmd === `${prefix}report`) {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("Couldn't find user.");
    let reason = args.join(" ").slice(22);
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#f44277")
    .addField("Report User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);
    let reportschannel = message.guild.channels.find(`name`, "reports");
    if (!reportschannel) return message.channel.send("Couldn't find reports channel.");
    message.delete().catch(O_o => {});
    reportschannel.send(reportEmbed);
    }


    if (cmd === `${prefix}kick`) {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No You Can't Do that!");
    if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user can't be kicked!");
    }




    if (cmd === `${prefix}hello`) {
    return message.channel.send("Hello Have a nice day!");
    }
    if (cmd === `${prefix}cookie`) {
    return message.channel.send("Here is a cookie! :cookie:");
    }
    if(cmd === `${prefix}serverinfo`) {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#f44277")
    .setThumbnail(sicon)
    .addField("Server Name!", message.guild.name)
    .addField("Created on!", message.guild.createdAt)
    .addField("You Joined!", message.member.joinedAt)
    .addField("Total Members!", message.guild.memberCount);
    return message.channel.send(serverembed);


    if (cmd === `${prefix}help`) {
    let helpembed = new Discord.RichEmbed()
    .setTitle("Help Section")
    .setDescription("All the commands available!")
    .setColor("#f909d5")
    .addField("?kick", "Kicks the selected user")
    .addField("?Botinfo", "Shows the bot info.", true)
    .addField("?serverinfo", "Shows the server info.")
    .addField("?report", "Used to report a user.")
    .addField("?cookie", "Gives you a cookie :).")
    .addField("?report", "Reports the user.")
    .addField("?hello", "Say hello!")
    message.delete().catch();
    message.channel.send(helpembed)
    }

    if (cmd === `${prefix}clear`)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("")
    if (!args[0]) return message.channel.send("Cleared!")
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    });

    if (cmd === `${prefix}botinfo`) {
    let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("Bot Information")
   .setThumbnail(bicon)
  .setColor("#f44277")
  .addField("Bot Name", bot.user.username)
  .addField("Created On", bot.user.createdAt);
  return message.channel.send(botembed);
  }
    });
client.login(process.env.BOT_TOKEN);
