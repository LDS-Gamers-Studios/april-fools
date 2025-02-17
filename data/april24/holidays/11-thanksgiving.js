// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const { log, initialTests } = require("./utils");
const data = require("../holidayData");

/**
 * @param {Discord.Message<true>} msg
*/
async function init(msg) {
  const embed = u.embed()
    .setColor(data.CONFIG.foolColor)
    .setTitle("Happy Thanksgiving!")
    .addFields({
      name: "Just a reminder for today that turkeys are birds and so am I",
      value: "The only difference is that if you eat me you can't get rid of the burn on the roof of your mouth"
    });
  msg.channel.send({ embeds: [embed] });
}

/**
 * @param {Discord.Message<true>} msg
 * @param {boolean} [override]
*/
async function event(msg, override = false) {
  if (!initialTests(msg.author.id, override)) return;
  msg.channel.send({ content: `Today I am thankful for ${data.thankfulFor.getRandom()}. What are you thankful for, ${msg.author}?`, allowedMentions: { parse: ["users"] } });
  log(msg.author, "thanks given");
}

module.exports = { init, event };