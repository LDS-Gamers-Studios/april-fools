const config = require("../../config/config.json");
const adMaterial = require("../../media/ads/ads.json");
const NoRepeat = require("no-repeat");
const moment = require("moment-timezone");
const Discord = require("discord.js");

const CONFIG = {
  ON: true,
  CONFIDENTIAL: false,
  // 10 - 6
  WORKMODE: () => {
    const time = moment().tz("America/Denver").hour();
    return time > 9 && time < 18;
  },
  /** @type {"pig"|"pirate"|"uwu"|"lol"|"off"} */
  LANGUAGE: "pirate",
  AI_COOLDOWN: 30_000,
  AD_DURATION: 7_000,
  TYPING_COOLDOWN: () => ((Math.random() * 3) + 2) * 120_000,
  VC_JOIN_DELAY: () => Math.max((Math.random() * 60) * 2_000, 30_000),
  VC_SWITCH_DELAY: () => ((Math.random() * 30) + 4) * 1_000,
  VC_WRITE_DELAY: () => Math.random() * 3 * 1_000
};


const emoji = config.devMode ? {
  // TESTING
  cat: "🐱",
  uwu: "🥵"
} : {
  // DEPLOYMENT
  cat: "413395390319296512",
  uwu: "231158440448229378"
};

const roles = config.devMode ? {
  birdFacts: "1295896238583058492"
} : {
  birdFacts: "1297270807176679584"
};

const duration = 72;
/** @type {Discord.PollData} */
const poll = {
  allowMultiselect: false,
  duration,
  question: { text: "What's your favorite language?" },
  answers: [
    { text: "Pirate Speak", emoji: "🦜" },
    { text: "Pig Latin", emoji: "🐷" },
    { text: "LOLCATZ", emoji: emoji.cat },
    { text: "UwU", emoji: emoji.uwu },
  ]
};

const ads = {
  play: new NoRepeat(adMaterial.play),
  work: new NoRepeat(adMaterial.work)
};

module.exports = { poll, CONFIG, roles, ads };