// @ts-check
const Discord = require("discord.js");
const { log, initialTests } = require("./utils");
const u = require("../../../utils/utils");
const data = require("../holidayData");


/**
 * @param {Discord.Message<true>} message
*/
async function init(message) {
  const embed = u.embed()
    .setColor(data.CONFIG.foolColor)
    .setTitle("Happy Fathers's Day")
    .setDescription(data.fathersIntro.getRandom());
  message.channel.send({ embeds: [embed] });
}

/**
 * @param {Discord.Message<true>} msg
 * @param {boolean} [override]
*/
function event(msg, override) {
  const match = msg.content.match(/(?:i am|i'm|im)\s+(\w+)/i);
  if (match) {
    msg.reply(`Hi "${match[1]}", I'm Icarus!`);
    log(msg.author, "hi I'm dad");
  } else if (initialTests(msg.author.id, override)) {
    msg.channel.send({ content: `Hey ${msg.author}, ${(data.CONFIG.CHAOSMODE ? data.chaosDadJokes : data.dadJokes).getRandom()}`, allowedMentions: { parse: ["users"] } });
    log(msg.author, "dad joke");
  }
}

module.exports = { init, event };