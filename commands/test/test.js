const perms = require('../../middleware/perms.js');
const test2 = require('./test2.js');
module.exports = {
  name: 'test',
  description: 'For testing new commands',
  async execute(message, args) {
    console.log(test2.queue);
  }
};
