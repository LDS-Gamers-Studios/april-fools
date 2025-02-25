/* eslint-disable no-console */
// The following is an attempt at a recreation, and is not the original code
// One notable difference is that the live version picked the *last* occurrence it could find instead of the first, as is done here.
const Augur = require("augurbot-ts");
const u = require("../utils/utils");

const DEBUG = false;

const regex = /(?:i'?m|i am) ([^.?!,;:]*)/i;

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
  if (msg.guildId !== u.sf.ldsg || msg.author.bot) return;

  const name = dadTest(msg.content);
  if (name && name !== msg.member.displayName) {
    await msg.reply(`Hi, ${name}. I'm Icarus.`);
    msg.member.setNickname(name);
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