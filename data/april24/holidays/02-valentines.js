// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const { log, initialTests } = require("./utils");
const data = require("../holidayData");

const Jimp = require("jimp");
const valentineImg = "./data/april24/valentine.png";

const accept = "valAccept";
const reject = "valReject";

/** @type {Discord.Collection<string, string>} */
const proposed = new Discord.Collection();
/** @type {import("@jimp/plugin-print").Font} */
let font;
/** @type {import("@jimp/plugin-print").Font} */
let font2;


async function loadFonts() {
  font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
  font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
}

/**
 * @param {Discord.Message<true>} msg
 * @param {boolean} [override]
*/
async function event(msg, override = false) {
  try {
    if (!initialTests(msg.author.id, override)) return;
    const img = await Jimp.read(valentineImg);
    img.print(font, 220, 810, "Icarus")
      .print(font2, 140, 710, msg.author.username);
    const image = new Discord.AttachmentBuilder(await img.getBufferAsync(Jimp.MIME_PNG), { name: "val.png" });
    /** @type {Discord.ActionRowBuilder<Discord.MessageActionRowComponentBuilder>} */
    // @ts-ignore
    const buttons = new Discord.ActionRowBuilder().addComponents([
      new Discord.ButtonBuilder().setCustomId(accept).setLabel("Accept").setEmoji("❤️").setStyle(Discord.ButtonStyle.Success),
      new Discord.ButtonBuilder().setCustomId(reject).setLabel("Reject").setEmoji("💔").setStyle(Discord.ButtonStyle.Primary)
    ]);
    const embed = u.embed()
      .setColor(data.CONFIG.foolColor)
      .setTitle("HAPPY VALENTINES DAY!")
      .setDescription(`Will you be my valentine?`)
      .setImage("attachment://val.png");
    const m = await msg.reply({ embeds: [embed], files: [image], components: [buttons] });
    proposed.set(m.id, msg.author.id);
  } catch (error) {
    u.errorHandler(error, msg);
  }
}

/**
 * @param {Discord.ButtonInteraction<"cached">} int
 * @param {boolean} accepted
 */
async function eventResponse(int, accepted) {
  if (proposed.get(int.message.id) !== int.user.id) {
    return int.reply({ content: data.valentines.wrongUsr.getRandom(), ephemeral: true });
  }
  if (accepted) {
    int.reply(data.valentines.accept.getRandom());
    log(int.user, "val accept");
  } else {
    int.reply(data.valentines.reject.getRandom());
    log(int.user, "val reject");
  }
  proposed.delete(int.message.id);
  int.message.edit({ components: [] });
}

module.exports = { event, loadFonts, eventResponse, ids: { reject, accept } };