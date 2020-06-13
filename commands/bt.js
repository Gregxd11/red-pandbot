const Discord = require('discord.js');

module.exports = {
  name: 'bt',
  description: 'Takes text and makes them into blocks',
  args: true,
  usage: '<text>',
  execute(message, args) {
    const results = [];

    const test = args.map((word) => {
      for (let i = 0; i < word.length; i++) {
        if (parseInt(word[i])) {
          return true;
        }
      }
    });

    if (test.includes(true)) {
      return message.channel.send("You can't include numbers!");
    }

    let words = args.map((word) => word.split(''));
    for (let i = 0; i < words.length; i++) {
      words[i].forEach((letter) =>
        results.push(`:regional_indicator_${letter.toLowerCase()}:`)
      );
      results.push(' ');
    }

    console.log(results);

    message.channel.send(results.join(''));
  }
};
