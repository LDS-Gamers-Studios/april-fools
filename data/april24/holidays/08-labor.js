// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const data = require("../holidayData");

/**
 * @param {Discord.Message<true>} message
*/
async function init(message) {
  const embed = u.embed()
    .setColor(data.CONFIG.foolColor)
    .setTitle("Happy Labor Day!")
    .addFields({
      name: "Wow, it's labor day already?",
      value: "Wait, what do you mean i don't get the day off?"
    });
  message.channel.send({ embeds: [embed] });
}

module.exports = { init };