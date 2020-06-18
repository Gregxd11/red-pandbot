module.exports = {
  name: 'train',
  description: 'A 50/50 chance on whether the train is called or not',
  cooldown: 5,
  execute(message, args) {
    let choice = Math.floor(Math.random() * 2) + 1;
    if (choice === 1) {
      return message.channel.send('Call the train. Do it.');
    }
    return message.channel.send(
      "Don't call the train. It's a bad idea don't do it."
    );
  }
};
