// @ts-check
const Discord = require("discord.js");
const { daylightFacts } = require("../holidayData");

/**
 * @param {Discord.Message<true>} message
*/
async function init(message) {
  message.channel.send(daylightFacts.getRandom());
}

module.exports = { init };