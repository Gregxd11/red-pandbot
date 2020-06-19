const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const mongoose = require('mongoose');
const commandHandling = require('./eventhandlers/commandhandling.js');

mongoose.connect('mongodb://localhost/redpandbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// Finds subdirectories in ./commands
const commandsImport = fs.readdirSync('./commands', { withFileTypes: true });
const commandDirs = [];
for (const dir of commandsImport) {
  if (dir.isDirectory()) {
    commandDirs.push(dir);
  }
}
// Pulls files from subdirectories in ./commands
for (const dir of commandDirs) {
  let dirName = dir.name;
  let commandFiles = fs
    .readdirSync(`./commands/${dirName}`)
    .filter((file) => file.endsWith('.js'));
  commandFiles.forEach((file) => {
    if (file) {
      const command = require(`./commands/${dirName}/${file}`);
      client.commands.set(command.name, command);
    }
  });
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', async (message) => {
  commandHandling(message, client, cooldowns);
});

client.login(token);
