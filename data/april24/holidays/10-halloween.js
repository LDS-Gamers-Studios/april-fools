// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const { log, initialTests } = require("./utils");
const data = require("../holidayData");

/**
 * @param {Discord.Message<true>} message
*/
async function init(message) {
  const embed = u.embed()
    .setColor(data.CONFIG.foolColor)
    .setTitle("Happy Halloween!")
    .addFields({
      name: "Trick or treat",
      value: "Wait, why don't you have any candy?"
    });
  message.channel.send({ embeds: [embed] });
}

/**
 * @param {Discord.Message<true>} msg
 * @param {boolean} [override]
*/
async function event(msg, override = false) {
  if (!initialTests(msg.author.id, override)) return;
  const embed = u.embed().setImage(data.jumpscares.getRandom());
  msg.reply({ content: "# BOO!\n I hope I didn't scare you too much", embeds: [embed] });
  log(msg.author, "jumpscare");
}

module.exports = { init, event };