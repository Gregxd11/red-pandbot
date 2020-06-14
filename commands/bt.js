const Discord = require('discord.js');

module.exports = {
  name: 'bt',
  description: 'Takes text and makes them into blocks',
  args: true,
  usage: '<text>',
  execute(message, args) {
    message.delete().catch((err) => console.log(err));

    const results = [];
    const numbers = [
      ':zero:',
      ':one:',
      ':two:',
      ':three:',
      ':four:',
      ':five:',
      ':six:',
      ':seven:',
      ':eight:',
      ':nine:'
    ];
    const regex = /[^A-Za-z\s]/;

    let words = args.map((word) => word.replace(regex, '').split(''));

    for (let i = 0; i < words.length; i++) {
      words[i].forEach((letter) => {
        if (parseInt(letter)) {
          results.push(numbers[letter]);
        }
        else {
          results.push(`:regional_indicator_${letter.toLowerCase()}: `);
        }
      });
      results.push('  ');
    }

    message.channel.send(results.join(''));
  }
};
