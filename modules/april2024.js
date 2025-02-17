// @ts-check

const Augur = require("augurbot-ts");
const u = require("../utils/utils");
const config = require("../config/config.json");
const data = require("../data/april24/holidayData");
const commands = require("../data/april24/holidays");
const { changeHoliday, isHoliday } = require("../data/april24/holidays/utils");

let msgCount = 0;
let triggerTime = Date.now() + (3 * 60_000);
let msgThreshold = Math.floor(Math.random() * 67);

const Module = new Augur.Module()
.addEvent("messageCreate", async (msg) => {
  try {
    if (msg.author.bot || !msg.inGuild() || !data.CONFIG.ENABLED || !msg.member) return;
    msgCount++;
    // avatar command
    if (msg.cleanContent.toLowerCase() === "!greenme") {
      return commands.stpat.greenMe(msg);
    }
    // debug commands
    if (config.devMode) {
      switch (msg.cleanContent.toLowerCase()) {
        case "!birthday": commands.bday.init(msg); return commands.bday.event(msg, true);
        case "!mc": return commands.misc.mcInit(msg);
        case "!war": return commands.misc.warInit(msg);
        case "!flags": return commands.misc.flagEvent(msg, true);
        case "!newyears": return commands.newyears.event(msg, true);
        case "!valentines": return commands.val.event(msg, true);
        case "!daylight": return commands.daylight.init(msg);
        case "!patricks": return commands.stpat.event(msg, true);
        case "!easter": return commands.easter.event(msg, true);
        case "!taxes": commands.taxes.init(msg); return commands.taxes.event(msg);
        case "!mothers": commands.mom.init(msg); return commands.mom.event(msg, true);
        case "!fathers": commands.dad.init(msg); return commands.dad.event(msg, true);
        case "!july": commands.july.init(msg); return commands.july.event(msg, true);
        case "!labor": return commands.labor.init(msg);
        case "!halloween": commands.halloween.init(msg); return commands.halloween.event(msg, true);
        case "!thanksgiving": commands.thanksgiving.init(msg); return commands.thanksgiving.event(msg, true);
        case "!christmas": return commands.christmas.event(msg, true);
        default: break;
      }
    }
    if (msg.content.startsWith("!") || msg.channelId !== u.sf.channels.general) return;
    if (msgCount >= msgThreshold && triggerTime < Date.now()) {
      // reset after activity and time
      changeHoliday(msg.guild);
      msgCount = 0;
      msgThreshold = Math.floor(Math.random() * 76) + 25;
      triggerTime = Date.now() + ((Math.floor(Math.random() * 19) + 10) * 60_000);
      // initialization messages
      if (isHoliday("Someone's Birthday")) commands.bday.init(msg);
      if (isHoliday("LDSG Geese vs Ducks War Memorial Day")) commands.misc.warInit(msg);
      if (isHoliday("Minecraft Server Crashing Day")) commands.misc.mcInit(msg);
      if (isHoliday("Daylight Savings Day")) commands.daylight.init(msg);
      if (isHoliday("Tax Day")) commands.taxes.init(msg);
      if (isHoliday("Mothers Day")) commands.mom.init(msg);
      if (isHoliday("Fathers Day")) commands.dad.init(msg);
      if (isHoliday("The 4th of July")) commands.july.init(msg);
      if (isHoliday("Labor Day")) commands.labor.init(msg);
      if (isHoliday("Halloween")) commands.halloween.init(msg);
      if (isHoliday("Thanksgiving")) commands.thanksgiving.init(msg);
    }

    if (isHoliday("Someone's Birthday")) commands.bday.event(msg);
    if (isHoliday("Flag Day")) commands.misc.flagEvent(msg);
    if (isHoliday("New Years")) commands.newyears.event(msg);
    if (isHoliday("Valentines Day")) commands.val.event(msg);
    if (isHoliday("St. Patricks")) commands.stpat.event(msg);
    if (isHoliday("Easter")) commands.easter.event(msg);
    if (isHoliday("Tax Day")) commands.taxes.event(msg);
    if (isHoliday("Mothers Day")) commands.mom.event(msg);
    if (isHoliday("Fathers Day")) commands.dad.event(msg);
    if (isHoliday("The 4th of July")) commands.july.event(msg);
    if (isHoliday("Halloween")) commands.halloween.event(msg);
    if (isHoliday("Thanksgiving")) commands.thanksgiving.event(msg);
    if (isHoliday("Christmas")) commands.christmas.event(msg);
  } catch (error) {
    u.errorHandler(error, msg);
  }
})
.addEvent("messageReactionAdd", (reaction, user) => {
  return commands.july.donations(reaction, user, false);
})
.addEvent("messageReactionRemove", (reaction, user) => {
  return commands.july.donations(reaction, user, false);
})
.setInit(async () => {
  commands.val.loadFonts();
})
.addInteraction({
  type: "Button",
  id: commands.val.ids.accept,
  onlyGuild: true,
  process: (int) => commands.val.eventResponse(int, true)
})
.addInteraction({
  type: "Button",
  id: commands.val.ids.reject,
  onlyGuild: true,
  process: (int) => commands.val.eventResponse(int, false)
})
.addInteraction({
  type: "SelectMenuString",
  id: commands.christmas.id,
  onlyGuild: true,
  process: commands.christmas.choiceHandler
});

module.exports = Module;