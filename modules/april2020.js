/* eslint-disable no-console */
// The following is an attempt at a recreation, and is not the original code
// One notable difference is that the live version picked a random occurrence instead of the first, as is done here. Either that or the regex was different.
const Augur = require("augurbot-ts");
const u = require("../utils/utils");

const DEBUG = false;

const regex = /(?:i'?m|i am) ([^.?!,;:]*)/i;

/** @type {Set<string>} */
const cooldowns = new Set();

/** @param {string} string */
function dadTest(string) {
  const match = regex.exec(string);
  if (match) {
    return match[1].substring(0, 32)
      .split(" ")
      .map(w => w[0].toUpperCase() + w.substring(1))
      .join(" ");
  }
  return null;
}

const Module = new Augur.Module()
.addEvent("messageCreate", async (msg) => {
  if (msg.guildId !== u.sf.ldsg || msg.author.bot || cooldowns.has(msg.author.id)) return;

  const name = dadTest(msg.content);
  if (name && name !== msg.member.displayName) {
    await msg.reply(`Hi, ${name}. I'm Icarus.`);
    msg.member.setNickname(name);
    cooldowns.add(msg.author.id);
    setTimeout(() => {
      cooldowns.delete(msg.author.id);
    }, 30 * 60_000); // actual time wasn't documented, assuming it was at least 30 minutes.
  }
});


if (DEBUG) {
  console.log(dadTest("I'm a bit annoyed by this new feature, I'm a little confused, and I'm really hungry right now"));
  console.log(dadTest("I'm just saying"));
  console.log(dadTest("I am Icarus and I do not speak with run on sentences"));
  console.log(dadTest("I am indeed the hype man 😅"));
  console.log(dadTest("Hey I'm contemplating running a slow moving multi-party pathfinder 1e pbp, would people be interested? I'm thinking really slow, like only 1 post/day"));
}

module.exports = Module;