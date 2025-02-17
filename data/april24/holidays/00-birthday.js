// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const { log } = require("./utils");
const data = require("../holidayData");

/** @type {string} */
let bday;
/**
 * @param {Discord.Message<true>} msg
*/
function init(msg) {
  bday = msg.author.id;
  const embed = u.embed()
    .setTitle("Happy Birthday!")
    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Emoji_u1f389.svg/128px-Emoji_u1f389.svg.png")
    .setDescription(`Happy birthday to this fantastic person!\n\n ${msg.author}`);
  msg.channel.send({ content: msg.author.toString(), embeds: [embed], allowedMentions: { parse: ["users"] } });
  log(msg.author, "birthday");
}

/**
 * @param {Discord.Message<true>} msg
 * @param {boolean} [override]
*/
function event(msg, override) {
  if (override || msg.author.id === bday) msg.react(data.bdayReactions.getRandom());
}

module.exports = { init, event };