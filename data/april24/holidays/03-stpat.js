// @ts-check
const Discord = require("discord.js");
const u = require("../../../utils/utils");
const { log, initialTests } = require("./utils");
const data = require("../holidayData");

const Jimp = require("jimp");
const pixels = require("image-pixels");
const palette = require("image-palette");
const { ColorActionName } = require("@jimp/plugin-color");

/** @param {Discord.GuildMember} member */
async function checkGreen(member) {
  const url = member?.displayAvatarURL({ extension: "png" });
  if (!url) return;
  try {
    /** @type {{ colors: any[]}} */
    const { colors } = palette(await pixels(url), 25);
    if (member?.displayHexColor) {
      const color = member?.displayHexColor;
      colors.push([
        parseInt(color.substring(1, 3), 16),
        parseInt(color.substring(3, 5), 16),
        parseInt(color.substring(5, 7), 16),
        255
      ]);
    }
    for (const [ r, g, b ] of colors) {
      if ((g > 63) && (g > 1.15 * Math.max(r, b))) return true;
    }
    return false;
  } catch (error) {
    u.errorHandler(error, member);
  }
}

/** @param {Discord.Message<true>} msg*/
async function greenMe(msg) {
  try {
    const av = await Jimp.read((msg.member ?? msg.author).displayAvatarURL({ extension: "png", size: 512 }));
    av.color([
      { apply: ColorActionName.DESATURATE, params: [100] },
      { apply: ColorActionName.SATURATE, params: [40] },
      { apply: ColorActionName.HUE, params: [120] },
    ]);
    const file = new Discord.AttachmentBuilder(await av.getBufferAsync(Jimp.MIME_PNG), { name: "greened.png" });
    return msg.reply({
      content: "Here's a green version of your profile picture - feel free to download and use if you like it!",
      files: [file]
    });
  } catch (error) {
    u.errorHandler(error, msg);
  }
}

/**
 * @param {Discord.Message<true>} msg
 * @param {boolean} [override]
*/
async function event(msg, override = false) {
  if (!initialTests(msg.author.id, override, data.CONFIG.CHAOSMODE ? 0.5 : 0.3) || !msg.member) return;
  const isGreen = await checkGreen(msg.member);
  if (isGreen === true) {
    msg.react("🍀").catch(u.noop);
    log(msg.author, "clover");
  } else if (isGreen === false) {
    msg.reply(`*pinches ${msg.member} for not wearing enough green and giggles while he runs away*\n(If you'd like to wear some green today, try \`!greenme\` in <#${u.sf.channels.botSpam}> to download a green avatar.)`);
    log(msg.author, "pinch");
  }
}

module.exports = { greenMe, event };