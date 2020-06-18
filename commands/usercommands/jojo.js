const quiz = require('../../quiz.json');

module.exports = {
  name: 'jojo',
  description: "Jojo's quiz",
  async execute(message, args) {
    let item = quiz[Math.floor(Math.random() * quiz.length)];
    //make filter to take value out of array so that same question isn't asked multiple times
    const filter = (response) => {
      return item.answers.some(
        (answer) => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel.send(item.question).then(() => {
      message.channel
        .awaitMessages(filter, { max: 1, time: 10000, errors: [ 'time' ] })
        .then((collected) => {
          message.channel.send(
            `${collected.first().author} got the correct answer!`
          );
        })
        .catch((collected) => {
          if (item.fullAnswer) {
            message.channel.send(
              `No one got it. The correct answer is ${item.answers}`
            );
            message.channel.send(
              `More information on that answer: ${item.fullAnswer}`
            );
          }
          else {
            message.channel.send(
              `No one got it. The correct answer is ${item.answers}`
            );
          }
        });
    });
  }
};
