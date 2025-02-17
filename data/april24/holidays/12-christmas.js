// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const config = require("../../../config/config.json");
const { log, initialTests, isHoliday } = require("./utils");
const data = require("../holidayData");

const id = "christmas";

/** @type {Discord.Collection<string, string>} msgId, userId*/
const gifted = new Discord.Collection();

/**
 * @param {Discord.Message<true>} msg
 * @param {boolean} [override]
*/
async function event(msg, override) {
  if (!initialTests(msg.author.id, override, 0.2)) return;
  const options = data.christmas.giftOptions;

  const row = u.MessageActionRow().addComponents([
    new Discord.StringSelectMenuBuilder()
      .setCustomId(id)
      .setPlaceholder("Choose a Christmas gift")
      .addOptions(data.CONFIG.CHAOSMODE ? data.christmas.chaosGiftOptions.concat(options) : options)
      .setMaxValues(1)
      .setMinValues(1)
  ]);

  const m = await msg.reply({ content: `# MERRY CHRISTMAS!\nI have a gift for you, ${msg.author}!`, components: [row] });
  gifted.set(m.id, msg.author.id);
  log(msg.author, "gift given");
}

/** @param {Discord.StringSelectMenuInteraction<"cached">} int */
async function role(int, isX = true) {
  try {
    const listRoles = data.christmas.roles[config.devMode ? "debug" : "live"];
    const roleColor = u.rand(listRoles);
    const list = ["naughty", "mediocre", "nice"][roleColor.type];
    log(int.user, `Xmas role ${list}`);

    await int.member.roles.remove(listRoles.filter(r => r.id !== roleColor.id).map(l => l.id));
    await int.member.roles.add(roleColor.id);

    return int.reply(`${isX ? "S" : "Well I normally don't give Christmas gifts if it's not christmas, but s"}ince you've been ${list} this year, ${int.user}, I'm giving you the ${roleColor.name} role!`);
  } catch (e) {
    return u.errorHandler(e, int);
  }
}

/** @param {Discord.StringSelectMenuInteraction<"cached">} int */
async function ember(int, isX = true) {
  try {
    const award = Math.floor(Math.random() * 15) + 15;
    int.reply(`${int.user}'s stocking has been filled with <:em:${u.sf.emoji.ember}>${award}! ${isX ? "" : "(Kinda weird that they asked me to do it off of Christmas tho)"}`);

    log(int.user, "stocking of ember");

    u.db.bank.addCurrency({
      discordId: int.user.id,
      description: "Stocking of Ember",
      currency: "em",
      value: award,
      giver: int.client.user.id
    });
    return;
  } catch (e) { return u.errorHandler(e, int); }
}

/** @param {Discord.StringSelectMenuInteraction<"cached">} int */
async function song(int, isX = true) {
  log(int.user, "sung a song");
  try {
    let poem = data.christmas.songs.getRandom().join("\n");
    for (let i = 1; i < 6; i++) {
      const obj = (data.CONFIG.CHAOSMODE ? data.christmas.chaosSongObjects : data.christmas.songObjects).getRandom();
      poem = poem.replaceAll(`$object${i}`, obj);
    }
    poem = poem.replaceAll("$name", int.member.displayName);
    return int.reply((isX ? "" : "A carol? At this time of year? Ok...\n") + poem);
  } catch (e) { return u.errorHandler(e, int); }
}

/** @param {Discord.StringSelectMenuInteraction<"cached">} int */
async function future(int, isX = true) {
  log(int.user, "future predicted");
  let str = `After consulting my crystal ball, I can safely say that ${data.christmas.predictions.getRandom()}. It is certain...`;
  if (!isX) str = "You're lucky I'm in a very gifting mood this time of year. I usually save this for Christmas, but I can make an exception. " + str;
  return int.reply(str);
}

/** @param {Discord.StringSelectMenuInteraction<"cached">} int */
async function secret(int, isX = true) {
  log(int.user, "secret told");
  let str = `Don't tell anyone, but ${data.christmas.secrets.getRandom()}`;
  if (!isX) str = "A Christmas secret after christmas? Ok I guess. " + str;
  return int.reply(str);
}

/** @param {Discord.StringSelectMenuInteraction<"cached">} int */
async function choiceHandler(int) {
  const isX = isHoliday("christmas");
  if (gifted.get(int.message.id) !== int.user.id) {
    return int.reply({
      content: data.christmas.giftWrongUsr.getRandom() + isX ? "" : " (it's also not christmas anymore)",
      ephemeral: true
    });
  }
  const choice = int.values[0];
  gifted.delete(int.message.id);
  await int.message.edit({ components: [] });
  switch (choice) {
    case "role": return role(int, isX);
    case "ember": return ember(int, isX);
    case "song": return song(int, isX);
    case "future": return future(int, isX);
    case "secret": return secret(int, isX);
    default: return;
  }
}

module.exports = { event, choiceHandler, id };