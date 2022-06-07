const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
let gambles = 0;

module.exports = {
    name: "gamble",
    description: "Starts a gamble.",
    category: "Economy",
    args: true,
    usage: ["gamble <@user> <amount>"],
    cooldown: 3,
    permissions: [],
    aliases: ["bet"],
    execute: async (client, message, args, prefix, guild, color, channel) => {
        let embed = new MessageEmbed().setColor(color);
        let user = await User.findOne({ id: message.author.id });
        if (!user || !user.pokemons[0]) return message.channel.send("You need to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!");
        let user1 = message.mentions.members.first();
        
        if (user1.id === message.author.id) return message.channel.send(`See ${prefix}help gamble for more information on how to use the gamble command.`);

        let u1 = false,
            u2 = false;
        let user2 = await User.findOne({ id: user1.id });
        if (!user2 || !user2.pokemons[0]) return message.channel.send(user1.user.username + " needs to pick a starter Pokémon using the \`" + prefix + "start\` command before gambling!");
        if (!args[1] || !parseInt(args[1])) return message.channel.send(`See ${prefix}help gamble for more information on how to use the gamble command.`);
        let amount = parseInt(args[1]);
        if (amount > user.balance) return message.channel.send(`You don't have enough balance to gamble`);
        if (amount > user2.balance) return message.channel.send(`${user2.user.username} doesn't have enough balance to gamble.`)
        gambles = gambles + 1;
let user69 = await User.findOne({ id: user1.tag });
      let embed69 = new MessageEmbed()
     .setColor(color)
        .setDescription(`** <@${message.author.id}> are you sure want to gamble <:pokerushemotes1:983603699618316288> ${amount} coins with <@${user1.id}>.**`)
        .setFooter(`type ${prefix} join ${gambles} to join the gamble.`)
       

        let msg = await message.channel.send(embed69);

        const collector = msg.channel.createMessageCollector(m => m.content.includes(prefix + "join " + gambles), { time: 60000 });

        collector.on('collect', m => {
        if(m.author.id === user1.id){
                let embed68 = new MessageEmbed()
     .setColor(color)
        
           .setDescription(`** <@${user1.id}> you joined <@${message.author.id}>'s gamble.**`)
        .setFooter(`${message.author.tag}'s gamble of ${amount} coins.`)
       

        message.channel.send(embed68);
                u1 = true;
                check();
            }
            if(m.author.id === message.author.id){
         let embed68 = new MessageEmbed()
     .setColor(color)
        
           .setDescription(`** <@${message.author.id}> you joined <@${message.author.id}>'s gamble.**`)
        .setFooter (`${message.author.tag}'s gamble of ${amount} coins.`)
       

        message.channel.send(embed68);
                u2 = true;
                check();
            }else{

            }
        });

        collector.on('end', (r, reason) => {
            if (reason === 'ended') {
                            return;
            }
        });

        async function check() {
            // console.log(1)
            if (u1 == true && u2 == true) {
                // console.log("ok")
                let arr = [true, true, true, true, false, false, false, false]
                let result = arr[Math.floor(Math.random() * arr.length)];
                if (result) {
                    user.balance = user.balance + amount
                    user2.balance = user2.balance - amount
                    await user.save()
                    await user2.save()
                    collector.stop('ended')
                    gambles = gambles - 1;
                    return message.channel.send(`<@${message.author.id}> won ${amount} coins!`)
                } else {
                    user2.balance = user2.balance + amount
                    user.balance = user.balance - amount
                    await user2.save()
                    await user.save()
                    collector.stop('ended')
                    gambles = gambles - 1;
                    return message.channel.send(`<@${user1.id}> won ${amount} coins!`)
                }
            } else {

            }
        }
    }
}