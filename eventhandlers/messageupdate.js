const Discord = require('discord.js');

const messageUpdate = async (oldMessage, newMessage, client) => {
  const botChannel = client.channels.cache.find(
    (c) => c.name === 'message-logs'
  );

  const embed = new Discord.MessageEmbed()
    .setColor('#e69500')
    .setAuthor(client.guilds.cache.first().name)
    .setDescription(`**Name:** ${oldMessage.author.username}`)
    .setTitle('**Message Edited**')
    .setThumbnail(client.guilds.cache.first().iconURL())
    .setImage(oldMessage.author.displayAvatarURL())
    .addFields(
      {
        name: 'Old Message:',
        value: oldMessage.content,
        inline: true
      },
      {
        name: 'New Message:',
        value: newMessage.content,
        inline: true
      }
    );

  botChannel.send(embed);
};

module.exports = messageUpdate;
