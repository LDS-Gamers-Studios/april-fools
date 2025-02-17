// @ts-check
const Discord = require("discord.js");
const { log, initialTests } = require("./utils");
const data = require("../holidayData");

/**
 * @param {Discord.Message<true>} msg
 * @param {boolean} [override]
*/
async function event(msg, override = false) {
  if (!initialTests(msg.author.id, override)) return;
  const resolution = (data.CONFIG.CHAOSMODE ? data.chaosResolutions : data.resolutions).getRandom();
  msg.reply(`# HAAAAPY NEW YEAR!\nThis year one of my resolutions is to ${resolution}. What's yours, ${msg.author}?`);
  log(msg.author, "resolution");
}

module.exports = { event };