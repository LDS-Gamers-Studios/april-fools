// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const data = require("../holidayData");

/**
 * @param {Discord.Message<true>} msg
*/
async function warInit(msg) {
  const winner = u.rand(["Ducks", "Geese"]);
  const embed = u.embed()
    .setColor(data.CONFIG.foolColor)
    .setTitle("WE ARE FREE!")
    .addFields({
      name: "Can you believe it's been 10 years since the LDSG Geese vs Ducks war?",
      value: `Don't tell anyone, but I was secretly supporting the ${winner}`
    });
  msg.channel.send({ embeds: [embed] });
}

/**
 * @param {Discord.Message<true>} msg
*/
async function mcInit(msg) {
  const embed = u.embed()
    .setTitle("Psst...")
    .setDescription("*Don't tell the admins, but I'm going to set the Minecraft server on fire again today*")
    .setFooter({ text: "See you in another 6 months!" })
    .setColor(data.CONFIG.foolColor);
  msg.reply({ embeds: [embed] });
}

/**
 * @param {Discord.Message<true>} msg
 * @param {boolean} [override]
*/
function flagEvent(msg, override = false) {
  if (Math.random() > 0.5 && !override) return;
  msg.react(data.flags.getRandom());
}

module.exports = { warInit, mcInit, flagEvent };