// @ts-check
const Augur = require("augurbot-ts");
const Discord = require("discord.js");
const { joinVoiceChannel, createAudioResource, createAudioPlayer, AudioPlayerStatus, VoiceConnection } = require("@discordjs/voice");
const { OpenAI } = require("openai");

const aiConfig = require("../config/ai.json");
const config = require("../config/config.json");
const u = require("../utils/utils");

const { poll, CONFIG, roles, ads } = require("../data/april25/config");
const { words: laterWords } = require("../data/april25/excuses");
const { WORKMODE } = CONFIG;

/** @type {Discord.Collection<string, number>} */
const adstuff = new u.Collection();


/** @param {any} log  */
function debugLog(...log) {
  // eslint-disable-next-line no-console
  if (config.devMode) console.log(...log);
}

// AI stuff
/** @type {Map<string, number>} */
const cooldowns = new Map();
let globalCooldown = 0;
const api = new OpenAI({ apiKey: aiConfig.auth });

let typingCooldown = false;

// Voice stuff
let canSwitchVCs = true;
/** @type {VoiceConnection} */
let connection;
/** @type {NodeJS.Timeout} */
let switchTimer;
let waitToTalk = true;

/**
 * Generate a roast of a user or channel
 * @param {Discord.GuildTextBasedChannel} channel
 */
function roast(channel, channelMode = false) {
  const topic = ("topic" in channel && channel.topic) ? ` for "${channel.topic}"` : "";
  const rules = [
    WORKMODE() ? "you're the ceo of a large company" : "you're a snarky bot in an online community",
    `make a PG roast of ${channelMode ? "users" : "the user talking"} in a channel called "#${channel.name}"${topic}`,
    "only output the roast",
    `${channelMode ? 100 : 50} words max`,
    "light jabs only",
    "make it personal"
  ];
  
  if (WORKMODE()) rules.push("use corporate jargon.");
  if (CONFIG.LANGUAGE === "pirate") rules.push("speak like a pirate");

  return rules.join(". ");
}

/**
 * @param {Discord.Message<true>} msg
 * @param {(msg: Discord.Message<true>) => any} cb
 * @param {number} [coolDur]
 */
async function cooldownCommand(msg, cb, coolDur = CONFIG.AI_COOLDOWN) {
  const cooldown = cooldowns.get(msg.author.id);
  if (cooldown) {
    msg.reply(`You're on cooldown! Try again in ${Math.floor((cooldown - Date.now()) / 1000)} seconds`)
      .then(u.clean)
      .catch(u.noop);
    return;
  }
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

  if (inputPart) model.messages.push({ role: "user", content: inputPart });
  return model;
};

const Module = new Augur.Module()
// AI Commands
.addCommand({ name: "roastme",
  onlyGuild: true,
  enabled: CONFIG.ON,
  onlyOwner: CONFIG.CONFIDENTIAL,
  hidden: true,
  process: (message) => {
    cooldownCommand(message, async (msg) => {
      // generate AI response
      await msg.channel.sendTyping();

      const params = genMessage(roast(msg.channel, false), `I'm ${msg.member?.displayName}, roast me.`);
      const completion = await api.chat.completions.create(params).catch(u.noop);
      
      msg.reply(completion?.choices[0].message.content || "Nothin...");
    });
  }
})
.addCommand({ name: "roastchannel",
  onlyGuild: true,
  enabled: CONFIG.ON,
  onlyOwner: CONFIG.CONFIDENTIAL,
  hidden: true,
  permissions: msg => u.perms.calc(msg.member, ["team"]),
  process: async (message) => {
    await message.delete();
    cooldownCommand(message, async (msg) => {
      await msg.channel.sendTyping();

      const params = genMessage(roast(msg.channel, true));
      const completion = await api.chat.completions.create(params).catch(u.noop);
      
      msg.channel.send(completion?.choices[0].message.content || "Nothin...");
    }, CONFIG.AI_COOLDOWN * 4);
  }
})
.addCommand({ name: "birdfact",
  onlyGuild: true,
  enabled: CONFIG.ON,
  onlyOwner: CONFIG.CONFIDENTIAL,
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
      if (CONFIG.LANGUAGE === "pirate") rules.push("speak like a pirate. Don't make it about parots");
      
      const params = genMessage(rules.join(". "));
      params.temperature = 1.2;

      await msg.channel.sendTyping();

      const completion = await api.chat.completions.create(params).catch(u.noop);
      let fact = completion?.choices[0].message.content;

      if (!fact) return msg.reply("Nothin...");

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
// Ping role and typing shenanigans
.addEvent("messageCreate", async (msg) => {
  if (!msg.inGuild() || !CONFIG.ON || CONFIG.CONFIDENTIAL || !msg.member || msg.content.startsWith(config.prefix) || msg.author.bot) return;
  const ref = msg.channel.messages.cache.get(msg.reference?.messageId ?? "");
  
  // bird unsubscribe
  if ( msg.content.toLowerCase() === "stop" && ref?.author.id === msg.client.user.id && ref.content.endsWith('Reply "STOP" to unsubscribe from bird facts')) {
    if (!msg.member.roles.cache.has(roles.birdFacts)) msg.member.roles.add(roles.birdFacts);
    msg.react("👍");
  // icarus is typing
  } else if (!typingCooldown && Math.random() < 0.2 && msg.channel.permissionsFor(u.sf.roles.icarus)?.has("SendMessages")) {
    msg.channel.sendTyping();
    typingCooldown = true;
    setTimeout(() => {
      typingCooldown = false;
    }, CONFIG.TYPING_COOLDOWN());
  }
  if (!msg.channel.isThread() && msg.channel.permissionsFor(u.sf.ldsg)?.has("SendMessages") && !msg.content.startsWith(config.prefix)) { // ad counter
    const c = adstuff.ensure(msg.channel.id, () => 0);
    adstuff.set(msg.channel.id, c + 1);

    // min posts and randomness
    if (c + 1 < 75) return;
    if (Math.random() > 0.5) return;
    
    adstuff.delete(msg.channel.id);

    // block people from speaking
    await msg.channel.permissionOverwrites.edit(msg.client.user.id, { SendMessages: true });
    await msg.channel.permissionOverwrites.edit(u.sf.ldsg, { SendMessages: false });
    
    // get and display the ad
    await msg.channel.send("Ad incoming!");
    const ad = (WORKMODE() ? ads.work : ads.play).getRandom();

    const link = ad.link ? `**[${ad.linkText}](<${ad.link}>)**` : "";

    await msg.channel.send({
      content: `## ${ad.tagline} ${link}`,
      files: [new Discord.AttachmentBuilder(`media/ads/${ad.image}`)]
    });

    // resume chat
    setTimeout((channel) => {
      channel.permissionOverwrites.edit(u.sf.ldsg, { SendMessages: true });
    }, CONFIG.AD_DURATION, msg.channel);
  }
})

// VC note taking
.addEvent("voiceStateUpdate", (old, newState) => {
  // only applicable for the first part
  if (!CONFIG.ON || CONFIG.CONFIDENTIAL) return;
  if (newState.channelId && old.channelId !== newState.channelId) {
    if (CONFIG.CONFIDENTIAL && newState.channel?.permissionsFor(u.sf.ldsg)?.has("ViewChannel")) return;
    debugLog("joined");
    setTimeout(() => {
      debugLog("maybe joining");
      const channel = newState.member?.voice.channel;
      if (!channel || !channel.joinable || !canSwitchVCs || channel.members.has(channel.client.user.id)) return;
      canSwitchVCs = false;

      switchTimer = setTimeout(() => {
        canSwitchVCs = true;
        debugLog("can switch");
      }, CONFIG.VC_SWITCH_DELAY());

      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guildId,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfDeaf: false, selfMute: false
      });

      const player = createAudioPlayer();
      connection.subscribe(player);

      let sound = createAudioResource("./media/pencil.ogg");
      /** @type {NodeJS.Timeout} */
      let playTimer;
      /** @type {number} */
      let speakingTime;
      /** @type {NodeJS.Timeout} */
      let speakingTimerReset;

      const pause = () => {
        if (player.state.status === AudioPlayerStatus.Playing) {
          player.pause();
          debugLog("pause");
        } else {
          debugLog("no pause");
        }
      };

      connection.receiver.speaking.on("start", () => {
        debugLog("started talking");
        clearTimeout(playTimer);
        clearTimeout(speakingTimerReset);
        pause();
        speakingTime = Date.now();
      });

      connection.receiver.speaking.on("end", () => {
        const time = Date.now() - speakingTime;
        if (waitToTalk || time < 1000) return;
        debugLog(time);
        debugLog("stopped talking");
        playTimer = setTimeout(() => {
          if (player.state.status === AudioPlayerStatus.Paused) {
            player.unpause();
          } else {
            if (sound.ended) sound = createAudioResource("./media/ads/pencil.ogg");
            player.play(sound);
          }
          debugLog("playing sound");
          speakingTimerReset = setTimeout(pause, time);
        }, CONFIG.VC_WRITE_DELAY());
      });
      waitToTalk = true;
      setTimeout(() => {
        debugLog("*takes notes out*");
        waitToTalk = false;
      }, CONFIG.VC_WRITE_DELAY());
    }, CONFIG.VC_JOIN_DELAY());
  } else if (
    old.channel && old.channel.id !== newState.channelId &&
    old.channel.members.size === 1 && old.channel.members.has(old.channel.client.user.id)
  ) {
    debugLog("left");
    clearTimeout(switchTimer);
    if (connection) connection.destroy();
    canSwitchVCs = true;
  } else {
    debugLog("nothing");
  }
})
// setup
.addCommand({ name: "poll",
  onlyGuild: true,
  onlyOwner: true,
  process: async (msg) => {
    msg.delete().catch(u.noop);
    msg.channel.send({ poll });
  }
})
.addCommand({ name: "init",
  permissions: msg => u.perms.isOwner(msg.member),
  onlyGuild: true,
  process: async (msg) => {
    const birdrole = msg.guild.roles.cache.get(roles.birdFacts);
    if (!birdrole) return msg.reply("Couldn't find the bird facts role");
    await birdrole.setName("Bird Facts Pings");
    await msg.guild.members.cache.get(msg.client.user.id)?.setNickname("Icarus - Pirate Bot of Legend");
    const fs = require("fs");
    const file = fs.readFileSync("channels.csv", "utf-8");
    for (const row of file.split("\n")) {
      // eslint-disable-next-line no-unused-vars
      const [id, name, pirate] = row.split(",");
      await msg.guild.channels.cache.get(id)?.setName(pirate).catch(u.noop);
    }
  }
})

// other commands
.addCommand({ name: "excuse",
  onlyGuild: true,
  enabled: CONFIG.ON,
  onlyOwner: CONFIG.CONFIDENTIAL,
  hidden: true,
  process: async (msg) => {
    const prop = WORKMODE() ? "work" : "play";
    const channel = u.rand(msg.guild.channels.cache.filter(c => c.permissionsFor(u.sf.ldsg)?.has("ViewChannel") && c.isSendable()).map(c => c.toString()));
    const name = u.rand(msg.guild.members.cache.map(m => m.toString()));
    const intro = laterWords[prop].intros.getRandom();
    let person = laterWords[prop].people.getRandom();
    let excuse = laterWords[prop].excuses.getRandom();
    const pronoun = person[0];
    let them = "";
    let their = "";
    switch (pronoun) {
      case "%": them = "him"; their = "his";
        break;
      case "^": them = "her"; their = "her";
        break;
      case "!": them = "it"; their = "its";
        break;
      default: them = "them"; their = "their";
        break;
    }
    person = person.substring(1);
    if (/[.!?]$/.test(intro) && excuse[0] === "#") person = person[0].toUpperCase() + person.substring(1);
    excuse = excuse
      .replace(/%/g, them)
      .replace(/\$/g, their)
      .replace(/#/g, person)
      .replace(/<@channel>/, channel)
      .replace(/<@name>/, name);
    return msg.reply({ content: `${intro} ${excuse}${WORKMODE() ? "." : "!"}`, allowedMentions: { users: [] } });
  }
})
.addCommand({ name: "ad",
  permissions: msg => u.perms.calc(msg.member, ["team"]),
  hidden: true,
  onlyGuild: true,
  enabled: CONFIG.ON,
  process: async (msg) => {
    msg.delete();

    if (!msg.channel.isThread() && msg.channel.permissionsFor(u.sf.ldsg)?.has("SendMessages")) {
      await msg.channel.permissionOverwrites.edit(msg.client.user.id, { SendMessages: true });
      await msg.channel.permissionOverwrites.edit(u.sf.ldsg, { SendMessages: false });
      
      await msg.channel.send("Ad incoming!");
      
      const ad = (WORKMODE() ? ads.work : ads.play).getRandom();
      const link = ad.link ? `**[${ad.linkText}](<${ad.link}>)**` : "";

      await msg.channel.send({
        content: `## ${ad.tagline} ${link}`,
        files: [new Discord.AttachmentBuilder(`media/ads/${ad.image}`)]
      });
      setTimeout((channel) => {
        channel.permissionOverwrites.edit(u.sf.ldsg, { SendMessages: true });
      }, CONFIG.AD_DURATION, msg.channel);
    }
  }
});


module.exports = Module;