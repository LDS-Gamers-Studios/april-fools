// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const { log, initialTests, isHoliday, getHoliday } = require("./utils");
const data = require("../holidayData");

/**
 * @param {Discord.Message<true>} message
 * @param {boolean} [override]
*/
async function event(message, override = false) {
  try {
    if (!initialTests(message.author.id, override, 0.3)) return;
    await message.react('🥚');

    const reaction = await message.awaitReactions({ maxEmojis: 1, maxUsers: 1, time: 60_000, filter: (r) => r.emoji.name === "🥚" }).catch(u.noop);
    const finder = reaction?.first()?.users.cache.first();
    await message.reactions.removeAll().catch(u.noop);

    if (!finder) return;

    u.db.bank.addCurrency({
      discordId: finder.id,
      description: `Egg found in #${message.channel.name}`,
      currency: "em",
      value: 60,
      giver: message.client.user.id
    });

    const embed = u.embed();
    embed.setTitle(`${finder} found an Easter egg hiding in ${message.channel}!`)
      .setColor(data.CONFIG.foolColor);
    if (!isHoliday("Easter")) {
      embed.addFields({
        name: `Who's hiding Easter eggs on ${getHoliday()}?`,
        value: "*We may never know...* but I've taken the egg and left **60 ember** in its place"
      });
    } else {
      embed.setDescription("I've taken the egg and left **60 ember** in its place");
    }
    message.reply({ embeds: [embed] });
    log(finder, "egg found");
  } catch (error) {
    u.errorHandler(error, message);
  }
}

module.exports = { event };