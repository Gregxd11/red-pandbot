const Discord = require('discord.js');

const memberUpdate = async (oldMember, newMember, client) => {
  const {
    target,
    changes,
    executor,
    action
  } = await client.guilds.cache
    .first()
    .fetchAuditLogs()
    .then((audit) => audit.entries.first())
    .catch(console.error);

  if (action === 'MEMBER_ROLE_UPDATE' || action === 'MEMBER_UPDATE') {
    const botChannel = client.channels.cache.find(
      (c) => c.name === 'pandbot-test'
    );
    let color;
    const changesArr = [];

    if (action === 'MEMBER_ROLE_UPDATE') {
      const role = changes[0].new[0].id;
      color = oldMember.guild.roles.cache.get(`${role}`).color;
      if (changes[0].key === '$add') {
        changesArr.push(
          {
            name: 'Role Added:',
            value: `<@&${role}>`,
            inline: true
          },
          {
            name: 'Added by:',
            value: executor.username,
            inline: true
          }
        );
      }
      else {
        changesArr.push(
          {
            name: 'Role Removed:',
            value: `<@&${role}>`,
            inline: true
          },
          {
            name: 'Removed by:',
            value: executor.username,
            inline: true
          }
        );
      }
    }

    let newNick;
    let oldNick;
    if (!changes[0].new) {
      newNick = 'None';
    }
    if (!changes[0].old) {
      oldNick = 'None';
    }

    if (changes[0].key === 'nick') {
      color = '#e69500';
      changesArr.push(
        {
          name: 'Old Nickname:',
          value: changes[0].old || oldNick,
          inline: true
        },
        {
          name: 'New Nickname:',
          value: changes[0].new || newNick,
          inline: true
        },
        {
          name: 'Updated by:',
          value: executor.username,
          inline: true
        }
      );
    }

    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setAuthor(client.guilds.cache.first().name)
      .setDescription(`**Name:** ${oldMember.user.username}`)
      .setTitle('**User Changed**')
      .setThumbnail(client.guilds.cache.first().iconURL())
      .setImage(oldMember.user.displayAvatarURL())
      .addFields(changesArr);

    botChannel.send(embed);
  }
};

module.exports = memberUpdate;
