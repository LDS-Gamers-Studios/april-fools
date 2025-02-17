// @ts-check
const Discord = require("discord.js");
const NoRepeat = require("no-repeat");
const { CONFIG, allHolidays } = require("../holidayData");
const u = require("../../../utils/utils");

const holidays = new NoRepeat(allHolidays);
let holiday = holidays.getRandom();
/** @type {Map<string, {name: string, banner: string}>} */
const chaosHolidays = new Map();

/** @type {string[]} */
const cooldowns = [];
// eslint-disable-next-line jsdoc/no-undefined-types
/** @type {NodeJS.Timeout} */
let globalCooldownTimer;
let globalCooldown = false;
/**
 * @param {string} userId
 * @param {boolean} override
 * @param {number} [minRng]
 */
function initialTests(userId, override = false, minRng = 0.2) {
  const cooldown = cooldowns.indexOf(userId);
  if (override) {
    if (cooldown !== -1) cooldowns.splice(cooldown, 1);
    cooldowns.push(userId);
    return true;
  }
  if (cooldown || globalCooldown) return false;
  if (Math.random() < minRng) return false;
  cooldowns.push(userId);
  if (cooldowns.length > 6) cooldowns.shift();
  globalCooldown = true;
  globalCooldownTimer = setTimeout(() => {
    globalCooldown = false;
  }, (Math.random() * 15 + 2) * 30_000);
  return true;
}

function resetGlobalCooldown() {
  if (globalCooldownTimer) clearInterval(globalCooldownTimer);
  globalCooldown = false;
}

/**
 *
 * @param {Discord.User | Discord.PartialUser} user
 * @param {string} event
 */
function log(user, event) {
  // eslint-disable-next-line no-console
  console.log(`AP 1,${event},${user.id},${user.displayName.replaceAll(",", "")}`);
}

/** @param {string} name  */
function isHoliday(name) {
  if (CONFIG.CHAOSMODE) return chaosHolidays.has(name);
  return holiday.name === name;
}

/** @param {Discord.Guild} guild */
function changeHoliday(guild) {
  if (CONFIG.CHAOSMODE) {
    // prevent a reset
    if (!holidays.lastResetWasAutomatic) {
      const h = holidays.getRandom();
      chaosHolidays.set(h.name, h);
      guild.setBanner(`./data/banners/${u.rand(holidays.chosen)}`);
    }
  } else {
    holiday = holidays.getRandom();
  }
}

function getHoliday() {
  if (CONFIG.CHAOSMODE) return u.rand([...chaosHolidays.values()]);
  return holiday;
}

module.exports = {
  initialTests,
  resetGlobalCooldown,
  log,
  isHoliday,
  getHoliday,
  changeHoliday,
};