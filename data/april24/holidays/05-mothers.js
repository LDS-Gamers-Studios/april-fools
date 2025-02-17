// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const { log } = require("./utils");
const data = require("../holidayData");

/**
 * @param {Discord.Message<true>} msg
*/
async function init(msg) {
  const embed = u.embed()
    .setColor(data.CONFIG.foolColor)
    .setTitle("Happy Mother's Day!")
    .setDescription(data.motherMsgs.getRandom());
  msg.channel.send({ embeds: [embed] });
}

/**
 * @param {Discord.Message<true>} msg
*/
function event(msg, override = false) {
  if (Math.random() > 0.3 && !override) return;
  msg.react(data.flowers.getRandom());
  log(msg.author, "mothers flower");
}

module.exports = { init, event };