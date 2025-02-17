// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const { log, initialTests } = require("./utils");

const taxReacts = ["🔥", "📮"];

/**
 * @param {Discord.Message<true>} msg
*/
async function init(msg) {
  msg.channel.send("It's tax day! make sure to file or <REDACTED> them!");
}

/**
 * @param {Discord.Message<true>} msg
 * @param {boolean} [override]
*/
async function event(msg, override = false) {
  if (!initialTests(msg.author.id, override, 0.3)) return;
  const a = await msg.react(taxReacts[0]).catch(u.noop);
  const b = await msg.react(taxReacts[0]).catch(u.noop);
  if (a || b) {
    const reaction = await msg.awaitReactions({
      maxEmojis: 1,
      maxUsers: 1,
      filter: (r, usr) => taxReacts.includes(r.emoji.name ?? "") && usr.id === msg.author.id
    }).catch(u.noop);
    if (reaction) {
      await msg.reactions.removeAll();
      log(msg.author, `${reaction.first()?.emoji.name}`);
    }
  }
}
module.exports = { init, event };