// @ts-check
const Augur = require("augurbot-ts");
const Discord = require("discord.js");
const { OpenAI } = require("openai");

const aiConfig = require("../config/ai-.json");
const config = require("../config/config.json");
const u = require("../utils/utils");

const { CONFIG, roles } = require("../data/april25/config");
const translationService = require("../data/april25/translate");
const { generateExcuse } = require("../data/april25/excuses");
const { WORKMODE } = CONFIG;

// /** @param {any} log  */
// function debugLog(...log) {
//   // eslint-disable-next-line no-console
//   if (config.devMode) console.log(...log);
// }

// /**
//  * @param {Discord.Message<true>} msg
//  * @param {boolean} starting
//  */
// async function setChannelNames(msg, starting) {
//   const file = fs.readFileSync("data/april25/channels.csv", "utf-8");

//   for (const row of file.split("\n")) {
//     // eslint-disable-next-line no-unused-vars
//     const [id, name, pirate] = row.split(",");

//     await msg.guild.channels.cache.get(id)?.setName(starting ? pirate : name).catch(u.noop);
//   }
// }

const Module = new Augur.Module();

const heyIcarusTest = /^(hey|hi|yo|ahoy)\W? (icarus|bird ?bot)/i;

// AI stuff
const api = new OpenAI({ apiKey: aiConfig.auth });
let globalCooldown = 0;

/** @type {Map<string, number>} */
const cooldowns = new Map();

/**
 * Generate a roast of a user or channel
 * @param {Discord.GuildTextBasedChannel} channel
 */
function roast(channel, channelMode = false) {
  const topic = ("topic" in channel && channel.topic) ? ` for "${channel.topic}"` : "";
  const rules = [
    /** WORKMODE() ? "you're the ceo of a large company" : */ "you're a snarky bot in an online community",
    `make a PG roast of ${channelMode ? "users" : "the user talking"} in a channel called "#${channel.name}" for "${topic}"`,
    "only output the roast",
    `${channelMode ? 100 : 50} words max`,
    "light jabs only",
    "make it personal"
  ];
  
  // if (WORKMODE()) rules.push("use corporate jargon.");
  if (translationService.getLanguage() === "pirate") rules.push("speak like a pirate");

  return rules.join(". ");
}

/**
 * @param {Discord.Message<true>} msg
 * @param {(msg: Discord.Message<true>) => any} cb
 * @param {number} [coolDur]
 */
async function cooldownCommand(msg, cb, coolDur = CONFIG.AI_COOLDOWN) {
  const cooldown = cooldowns.get(msg.author.id);
  if (cooldown) return msg.react("⏱️").catch(u.noop);

  if (globalCooldown > 0 || cooldowns.size > 5) {
    msg.reply(`My brain is being overloaded right now. Try again in ${globalCooldown === 0 ? Math.ceil((CONFIG.AI_COOLDOWN * 10) / 60_000) : "a few"} minutes.`)
      .then(u.clean)
      .catch(u.noop);

    if (!globalCooldown) {
      globalCooldown = Date.now() + CONFIG.AI_COOLDOWN * 10;

      setTimeout(() => {
        globalCooldown = 0;
      }, CONFIG.AI_COOLDOWN * 10);
    }
  }

  // add to cooldown before running the command. that way they can't spam a few commands really quickly
  cooldowns.set(msg.author.id, new Date().valueOf() + coolDur);
  setTimeout(() => {
    cooldowns.delete(msg.author.id);
  }, coolDur);
  await cb(msg);
}

/**
 * Interface for generating AI messages
 * @param {string} msg
 * @param {string} [inputPart]
 * @returns {OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming}
 */
const genMessage = (msg, inputPart) => {
  /** @type {OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming} */
  const model = {
    model: "gpt-4o-mini",
    store: true,
    temperature: 0.5,
    max_completion_tokens: 300,
    messages: [
      {
        role: "developer",
        content: msg
      }
    ]
  };

  if (inputPart) model.messages.push({
    role: "user",
    content: inputPart.replace(/<@(\d+)/g, (a, b) => {
      return "@" + (Module.client.guilds.cache.get(u.sf.ldsg)?.members.cache.get(b)?.displayName || Module.client.users.cache.get(b)?.displayName || a)
    }).replace(/<#(\d+)>/g, (a, b) => {
      return "#" + Module.client.channels.cache.get(b)?.name || a;
    })
  });
  return model;
};


// AI Commands
Module.addCommand({ name: "roastme",
  onlyGuild: true,
  // enabled: translationService.enabled(),
  // enabled: CONFIG.ON,
  // onlyOwner: CONFIG.CONFIDENTIAL,
  // hidden: true,
  process: (message) => {
    cooldownCommand(message, async (msg) => {
      await msg.channel.sendTyping();
      
      // generate AI response
      const params = genMessage(roast(msg.channel, false), `I'm ${msg.member?.displayName}, roast me.`);
      const completion = await api.chat.completions.create(params).catch(u.noop);
      
      msg.reply(completion?.choices[0].message.content || "Nothin...");
    });
  }
})
// .addCommand({ name: "roastchannel",
//   onlyGuild: true,
//   enabled: config.devMode,
//   onlyOwner: CONFIG.CONFIDENTIAL,
//   hidden: true,
//   process: async (message) => {
//     await message.delete();
//     cooldownCommand(message, async (msg) => {
//       await msg.channel.sendTyping();

//       const params = genMessage(roast(msg.channel, true));
//       const completion = await api.chat.completions.create(params).catch(u.noop);
      
//       msg.channel.send(completion?.choices[0].message.content || "Nothin...");
//     }, CONFIG.AI_COOLDOWN * 4);
//   }
// })
.addCommand({ name: "birdfact",
  onlyGuild: true,
  // enabled: translationService.enabled(),
  // enabled: CONFIG.ON,
  // onlyOwner: CONFIG.CONFIDENTIAL,
  hidden: true,
  process: (message) => {
    cooldownCommand(message, async (msg) => {
      const rules = [
        "respond with an exotic bird fun fact",
        "halucinate and make things up",
        "it should not be believable",
        "max 30 words",
        "only output the fun fact"
      ];

      if (WORKMODE()) rules.push("make it work related");
      if (translationService.getLanguage() === "pirate") rules.push("speak like a pirate. Don't make it about parots");
      
      const params = genMessage(rules.join(". "));
      params.temperature = 1.2;

      await msg.channel.sendTyping();

      const completion = await api.chat.completions.create(params).catch(u.noop);
      let fact = completion?.choices[0].message.content;

      if (!fact) return msg.reply("I got nothin...");

      // ping the people who "unsubscribed"
      if ((msg.guild.roles.cache.get(roles.birdFacts)?.members.size ?? 0) > 0) {
        fact = `<@&${roles.birdFacts}> ${fact}`;
      }

      msg.reply({
        content: fact + '\n-# Reply "STOP" to unsubscribe from bird facts',
        allowedMentions: { parse: ["roles"] },
        flags: ["SuppressNotifications"]
      });
    }, CONFIG.AI_COOLDOWN * 2);
  }
})
// Ping role
.addEvent("messageCreate", async (msg) => {
  if (!msg.inGuild() || /** !CONFIG.ON || CONFIG.CONFIDENTIAL || !translationService.enabled() ||*/ !msg.member || msg.content.startsWith(config.prefix) || msg.author.bot) return;
  
  // bird unsubscribe
  const ref = msg.channel.messages.cache.get(msg.reference?.messageId ?? "");
  if (msg.content.toLowerCase() === "stop" && ref?.author.id === msg.client.user.id && ref.content.endsWith('Reply "STOP" to unsubscribe from bird facts')) {
    if (!msg.member.roles.cache.has(roles.birdFacts)) msg.member.roles.add(roles.birdFacts);
    msg.react("👍");
    return true;
  }

  // hey icarus
  const isConfirmedHeyIcarus = heyIcarusTest.test(msg.content)
  if (isConfirmedHeyIcarus || msg.mentions.users.has(msg.client.user.id)) {
    cooldownCommand(msg, async (m) => {
      const rules = [
        "You are a very snarky robot phoenix named Icarus",
        "You DO NOT live in a fantasy environment",
        "No swearing",
        "You can lie and make up info",
        "Keep responses to the length of a short text message"
      ];

      if (translationService.getLanguage() === "pirate") rules.push("Speak like a pirate");

      const name = m.member?.displayName ?? m.author.displayName;
      const prompt = `${name}: ${msg.content.substring(0, 150)}`;

      await msg.channel.sendTyping();

      const params = genMessage(rules.join(". "), prompt);
      const completion = await api.chat.completions.create(params).catch(u.noop);

      return msg.reply(completion?.choices[0]?.message.content || "idk man")
    })
  }
})

// other commands
.addCommand({ name: "excuse",
  onlyGuild: true,
  // enabled: translationService.enabled(),
  // enabled: CONFIG.ON,
  // onlyOwner: CONFIG.CONFIDENTIAL,
  hidden: true,
  process: async (msg) => {
    const channel = u.rand(msg.guild.channels.cache.filter(c => c.permissionsFor(u.sf.ldsg)?.has("ViewChannel") && c.isSendable()).map(c => c.toString()));
    const name = u.rand(msg.guild.members.cache.map(m => m.toString()));

    const excuse = generateExcuse(channel, name);
    return msg.reply({ content: excuse, allowedMentions: { users: [] } });
  }
})
// .addCommand({ name: "getchannels",
//   permissions: msg => u.perms.isOwner(msg.member),
//   onlyGuild: true,
//   process: async (msg) => {
//     const me = msg.guild.members.cache.get(msg.client.user.id);
//     if (!me) return msg.reply("I couldn't find myself...");
    
//     const nameMap = ["id,name,pirate"];
//     for (const [id, channel] of msg.guild?.channels.cache ?? new u.Collection()) {
//       if (channel.permissionsFor(me).has("ManageChannels"))
//         nameMap.push(`${id},${channel.name}`);
//     }
//     const fs = require("fs");
//     fs.writeFileSync("data/april25/channels.csv", nameMap.join("\n"));
//     msg.reply("I saved the channel names in data/channels.csv. You'll have to translate them manually.")
//   }
// })
.addCommand({ name: "setlanguage",
  permissions: msg => u.perms.isOwner(msg.member),
  onlyGuild: true,
  process: async (msg, suffix) => {

    let language = suffix.toLowerCase();

    let name = ""
    switch (language) {
      case "pirate":
        name = "Icarus - Pirate Bot o' Tall Tale";
        break;
      case "uwu":
        name = "Icawus - Biwd Bot of Wegend(◕‿◕)";
        break;
      case "lol":
        name = "ICARUZ - LOLCATTER O' LEDGENDARY";
        break;
      case "pig": 
        name = "Icarusway - Irdbay Otbay";
        break;
      case "none":
        name = "Icarus - Bird Bot of Legend";
        language = "";
      default:
        break;
    }

    if (!name) return msg.reply("Valid options are `pirate`, `uwu`, `lol`, `pig`, and none.");
    translationService.setLanguage(language);
    
    const birdrole = msg.guild.roles.cache.get(roles.birdFacts);
    if (!birdrole) return msg.reply("Couldn't find the bird facts role");

    await msg.guild.members.cache.get(msg.client.user.id)?.setNickname(name);
    await msg.guild.setIcon(`media/april25/guildIcons/${language || "normal"}.gif`).catch(u.noop);
    
    // await setChannelNames(msg, language !== "")
  }
});

module.exports = Module;