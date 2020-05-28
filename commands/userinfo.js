const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'userinfo',
	description: 'Shows user info',
	usage: '<@user>',
	cooldown: 3,
	guildOnly: true,
	aliases: [ 'user info', 'information' ],
	execute(message, args) {
		if (!message.mentions.users.size) {
			console.log(message);
			return message.reply('you need to tag a user in order to get their information!');
		}

		//HANDLING ROLES
		const rolesArr = message.mentions.members.first()._roles;
		const roles = [];
		for (let role of rolesArr) {
			roles.push(message.mentions.guild.roles.cache.get(`${role}`).name);
		}

		//START CARD DISPLAY
		const taggedUser = message.mentions.users.first();
		let joinDate = new Date(message.mentions.members.first().joinedTimestamp).toUTCString();
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
			)
			.addFields({
				name: 'Time of post',
				value: reqTime
			});
		message.channel.send(embed);
	}
};
