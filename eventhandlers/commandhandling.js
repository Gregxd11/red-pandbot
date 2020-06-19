const { prefix } = require('../config.json');
const Discord = require('discord.js');

const commandHandling = async (message, client, cooldowns) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply("I can't execute that command inside DMs!");
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    module.exports = {
      name: 'reload',
      description: 'Reloads a command',
      args: true,
      execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command =
          message.client.commands.get(commandName) ||
          message.client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
          );

        if (!command) {
          return message.channel.send(
            `There is no command with name or alias \`${commandName}\`, ${message.author}!`
          );
        }

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
          const newCommand = require(`./${command.name}.js`);
          message.client.commands.set(newCommand.name, newCommand);
          message.channel.send(`Command \`${command.name}\` was reloaded!`);
        } catch (error) {
          console.log(error);
          message.channel.send(
            `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
          );
        }
      }
    };
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
};

module.exports = commandHandling;
