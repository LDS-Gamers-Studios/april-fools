// @ts-check
const Augur = require("augurbot-ts"),
  Discord = require("discord.js"),
  fs = require("fs"),
  u = require("../utils/utils"),
  config = require("../config/config.json");

const sf = config.devMode ? {
  DODGEBALL_CHANNEL: "",
  PRISON_CHANNEL: "",
  PRISON_ROLE: ""
} : {
  DODGEBALL_CHANNEL: "957792345741475870",
  PRISON_CHANNEL: "957792404172328990",
  PRISON_ROLE: "957799040223944704"
};

const BALL_CHANCE = 0.25;
const FIRST_MESSAGE_ID = "958784592750448690";
const CATCH_TIME = () => 2_000 + (6_000 - 2_000) * Math.random(); // 2-6 seconds


/** @param {Discord.Message} msg  */
async function throwDodgeball(msg) {
  if (
    msg.channel.id !== sf.DODGEBALL_CHANNEL || !msg.inGuild() ||
    msg.author.bot || msg.webhookId || msg.system ||
    msg.cleanContent.startsWith("!") || msg.cleanContent.startsWith("_")
  ) return;
  try {
    if (Math.random() > BALL_CHANCE) return;

    const thrown = await msg.react("🏐").catch(u.noop);
    // If they've blocked the bot
    if (!thrown) return;

    const userReact = await msg.awaitReactions({
      filter: (r, usr) => r.emoji.name === "🏐" && usr.id === msg.author.id,
      time: CATCH_TIME(),
      max: 1
    }).catch(u.noop);

    await msg.reactions.removeAll();

    // they didn't get it in time
    if (!userReact || userReact.size === 0) {
      await msg.react("💥");
      await msg.member?.roles.add(sf.PRISON_ROLE);
      msg.client.getTextChannel(sf.PRISON_CHANNEL)?.send({ content: `${msg.member} got hit!`, allowedMentions: { parse: ['users'] } });
      setTimeout(() => {
        msg.member?.roles.remove(sf.PRISON_ROLE);
      }, 60 * 60_000);
    } else { // they DUCKED! (heh)
      msg.react("🦆");
    }
  } catch (error) {
    u.errorHandler(error, "Error code AF2");
  }
}

/** @param {Discord.Message<true>} msg */
async function countStats(msg) {
  const channel = msg.client.getTextChannel(sf.DODGEBALL_CHANNEL);
  if (!channel) return msg.reply("Sorry, I couldn't find the dodgeball channel");

  let lastId = msg.id;
  /** @type {Set<Discord.Message<true>>} */
  const messages = new Set();

  // fetch every message in the channel
  while (lastId !== FIRST_MESSAGE_ID) {
    const fetched = await channel.messages.fetch({ limit: 100, before: lastId }).then((res) => {
      return res.sort((v1, v2) => v1.createdTimestamp - v2.createdTimestamp);
    });
    lastId = fetched.firstKey() || FIRST_MESSAGE_ID;
    for (const message of fetched.values()) {
      messages.add(message);
    }
    // eslint-disable-next-line no-console
    console.log(`${messages.size} messages collected.`);
  }

  // count up ducks and hits
  /** @type {Discord.Collection<string, [number, number]>} */
  const members = new u.Collection();
  let total = 0;
  let done = 0;
  for (const message of messages) {
    const duck = await message.reactions.resolve("🦆")?.fetch();
    const hit = await message.reactions.resolve("💥")?.fetch();

    if (duck?.me || hit?.me) {
      let [ducks, hits] = members.get(message.author.id) ?? [0, 0];
      if (duck?.me) ducks++;
      if (hit?.me) hits++;

      members.set(message.author.id, [ducks, hits]);
      total++;
    }
    done++;
    // eslint-disable-next-line no-console
    if (done % 100 === 0) console.log(`${done} messages processed.`);
  }

  const lines = ["Member,Ducks,Hits"].concat(members.map((id, vals) => `${id},${vals[0]},${vals[1]}`));

  const content = lines.join("\n");
  fs.writeFileSync('april.csv', content);

  await msg.reply(`${lines.length} members and ${total} results counted.`);
  await msg.reply({
    content: `${lines.length} members and ${total} results counted.`,
    files: [new Discord.AttachmentBuilder(content, { name: "april.csv" })]
  });
}

const Module = new Augur.Module()
.addCommand({
  name: "aprilstats",
  category: "April Fools",
  description: "Count April Fools 2022 statistics",
  hidden: true,
  permissions: u.perms.isOwner,
  onlyGuild: true,
  process: countStats
})
.addEvent("messageCreate", throwDodgeball);

module.exports = Module;