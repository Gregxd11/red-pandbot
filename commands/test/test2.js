const perms = require('../../middleware/perms.js');
module.exports = {
  name: 'test2',
  description: 'For testing new commands',
  queue: [],
  async execute(message, args) {
    for (let i = 0; i < 4; i++) {
      this.queue.push(i);
    }
  }
};
