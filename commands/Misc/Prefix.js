const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const { capitalize } = require('../../functions.js');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
const config = require("../../config.js")

module.exports = {
  name: "setprefix",
  description: "change prefix of server.",
  category: "setting",
  usage: ["setprefix <args>"],
  cooldown: 3,
  permissions: ['MANAGE_MESSAGES'],
  aliases: ["prefix"],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    //const guild = await Guild.findOne({ id: message.guild.id }); bhaiya ko bulau kya lmfao
    //haaaa
    if (!guild) {
      const server = new Guild({ id: message.guild.id, prefix: null, spawnchannel: null, spawnbtn: false, levelupchannel: null, levelupbtn: null });
      await server.save();
    }

     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`> ${config.no}  **You need manage messages permission to use this command**`)

    let msg = await message.channel.send(`Do you Confirm to Set New Prefix to \`${args[0]}\` ?`);
    await msg.react("✅");
    msg.react("❌");
    console.log(message.author.id);
    const collector = msg.createReactionCollector((reaction, userx) => ['✅', '❌'].includes(reaction.emoji.name) && userx.id === message.author.id, { time: 60000 });

   
       
      
    
      collector.on('collect', async (reaction, userx) => {
        collector.on('end', collected => {
            return msg.reactions.removeAll();
    });
        
        if (reaction.emoji.name === "✅") {
          collector.stop();
        let nguild = await Guild.findOne({ id: message.guild.id });
        let user = await User.findOne({ id: message.author.id });
        if (!args[0]) return message.channel.send(`Correct usage: **${nguild.prefix || client.config.prefix}prefix <value>** or **${nguild.prefix || client.config.prefix}px <value>**`)
        let nprefix = args.slice(0).join("");
        if (nprefix.length > 5) return message.channel.send(`> ${config.no} **Max prefix length is 5 characters**`);
        nguild.prefix = nprefix;
        await nguild.save();
        message.reactions.removeAll();
        msg.reactions.removeAll();
        return message.channel.send({ embed: { title: ``, color: 0x00f9ff, description: `> ${config.yes} **Prefix for ${message.guild.name} has been set to \`${nprefix}\`**` } });
      } else if (reaction.emoji.id === "❌") {
        collector.stop("aborted");
        message.reactions.removeAll();
        msg.reactions.removeAll();
        return message.channel.send("Ok Aborted.")
      }
    });

    collector.on('end', collected => {
      return;
    });
  }
}