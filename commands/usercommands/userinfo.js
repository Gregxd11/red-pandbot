const Discord = require('discord.js');
const client = new Discord.Client();
const User = require('../../models/user.js');
module.exports = {
  name: 'userinfo',
  description: 'Shows user info',
  usage: '<@user>',
  cooldown: 3,
  guildOnly: true,
  aliases: [ 'user info', 'information' ],
  async execute(message, args) {
    if (!message.mentions.users.size) {
      return message.reply(
        'you need to tag a user in order to get their information!'
      );
    }

    //HANDLING ROLES
    const rolesArr = message.mentions.members.first()._roles;
    const roles = [];
    for (let role of rolesArr) {
      roles.push(message.mentions.guild.roles.cache.get(`${role}`).name);
    }

    //START CARD DISPLAY
    const taggedUser = message.mentions.users.first();
    // const [ botPerms ] = await User.find({ discordId: taggedUser.id });
    let joinDate = new Date(
      message.mentions.members.first().joinedTimestamp
    ).toUTCString();
    let reqTime = new Date(message.createdTimestamp).toUTCString();
    const embed = new Discord.MessageEmbed()
      .setColor('#e69500')
      .setAuthor(message.guild.name)
      .setDescription(`**Name:** ${taggedUser.username}`)
      .setTitle('**OVERVIEW**')
      .setThumbnail(message.guild.iconURL())
      .setImage(taggedUser.displayAvatarURL())
      .addFields(
        {
          name: 'Joined:',
          value: joinDate,
          inline: true
        },
        {
          name: 'Roles:',
          value: roles,
          inline: true
        }
        // This is just to test the db
        // {
        //   name: 'Bot Permissions',
        //   value: botPerms.rpRole
        // }
      )
      .addFields({
        name: 'Time of post',
        value: reqTime
      });
    message.channel.send(embed);
  }
};
