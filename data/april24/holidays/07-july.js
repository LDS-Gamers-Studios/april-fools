// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const { log, initialTests } = require("./utils");
const data = require("../holidayData");

let pancakeYear = 4;
/** @type {Discord.Collection<string, number>} */
const pancakeRaising = new Discord.Collection();
let pancakesUsed = 0;

function pcCount() {
  if (pancakeRaising.size === 0) return Math.floor(Math.random() * 26) + 15;
  return pancakeRaising.reduce((a, b) => a + b, 0) - pancakesUsed;
}

/**
 * @param {Discord.Message<true>} msg
*/
async function init(msg) {
  const m = await msg.channel.send(`${data.julyOpeners.getRandom()} we're hosting our ${pancakeYear}th annual pancake party!\n` +
  `Thanks to the donations we received last year, it looks like we have ${pcCount()} pancakes to feed all ${msg.guild.memberCount} of us! ` +
  `Hopefully that'll be enough to go around. If you want to donate for next year, 1 pancake react now = ${data.CONFIG.CHAOSMODE ? 10 : 3 } pancake reacts next year.`);
  pancakeRaising.set(m.id, 0);
  m.react("🥞");
  pancakeYear++;
}

/**
 * @param {Discord.Message<true>} msg
 * @param {boolean} [override]
*/
async function event(msg, override) {
  if (!initialTests(msg.author.id, override, 0.3) || pcCount() === 0) return;
  try {
    msg.react("🥞");
    pancakesUsed++;
    log(msg.author, "pancake eaten");
  } catch (error) {
    u.noop();
  }
}

/**
 * @param {Discord.MessageReaction | Discord.PartialMessageReaction} reaction
 * @param {Discord.User | Discord.PartialUser} user
 * @param {boolean} giving
 */
async function donations(reaction, user, giving) {
  if (reaction.emoji.name === "🥞") {
    const raised = pancakeRaising.get(reaction.message.id);
    if (!raised) return;
    const num = data.CONFIG.CHAOSMODE ? 10 : 3;
    if (giving) {
      pancakeRaising.set(reaction.message.id, raised + num);
      log(user, "pancake donation");
    } else {
      pancakeRaising.set(reaction.message.id, Math.max(raised - num, 0));
      log(user, "pancake un-donation");
    }
    return true;
  }
}

module.exports = { init, event, donations };