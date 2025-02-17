// @ts-check
const NoRepeat = require("no-repeat");
const u = require("../../utils/utils");
const songs = require("./carols.json");

const CONFIG = {
  ENABLED: false,
  CHAOSMODE: false,
  foolColor: 0x46ff36,
};

const em = `<:em:${u.sf.emoji.ember}>`;
const gb = `<:gb:${u.sf.emoji.gb}>`;

const banners = {
  "ny": "newyears.png",
  "val": "valentines.png",
  "stpat": "stpatricks.png",
  "daylight": "daylight.png",
  "easter": "easter.png",
  "ind": "4thjuly.png",
  "mom": "mothers.png",
  "dad": "fathers.png",
  "lab": "labor.png",
  "labBad": "laborbad.png",
  "hal": "halloween.png",
  "thk": "thanksgiving.png",
  "xm1": "christmas1.png",
  "xm2": "christmas2.png",
  "bdy": "birthday.png"
};

module.exports = {
  allHolidays: [
    { name: "New Years", banner: banners.ny },
    { name: "Valentines Day", banner: banners.val },
    { name: "Daylight Savings Day", banner: banners.daylight },
    { name: "St. Patricks", banner: banners.stpat },
    { name: "Tax Day", banner: banners.labBad },
    { name: "Easter", banner: banners.easter },
    { name: "Mothers Day", banner: banners.mom },
    { name: "Flag Day", banner: banners.ind },
    { name: "Fathers Day", banner: banners.dad },
    { name: "The 4th of July", banner: banners.ind },
    { name: "Labor Day", banner: banners.lab },
    { name: "Halloween", banner: banners.hal },
    { name: "Thanksgiving", banner: banners.thk },
    { name: "Christmas", banner: banners.xm1 },
    { name: "My Birthday", banner: banners.bdy },
    { name: "LDSG Geese vs Ducks War Memorial Day", banner: banners.ny },
    { name: "Minecraft Server Crashing Day", banner: banners.labBad },
  ],
  julyOpeners: new NoRepeat([
    "Four score and seven years ago, our founding fathers established today as national pancake breakfast day, also known as independence day or the fourth of July in some places. In honor of that,",
    "Hey all! Looks like its that time of year again! Today as 'MERICA celebrates their independence,",
    "Fire up that grill, cuz",
    `Rise and shine, it's Independence Day,
        A time to celebrate in a tasty way!
        Pancakes hot, syrup sweet,
        Gather 'round, can't be beat!
        That's right folks,`,
    "Ladies and gentlemen, may I present the highlight of the year! Today"
  ]),
  bdayReactions: new NoRepeat([
    "🥳", "🎂", "🍰",
    "🍦", "🥮", "🎉",
    "🎈", "✨️", "🎁"
  ]),
  christmas: {
    giftOptions: [{
      label: "Colored Role",
      description: "Naughty or Nice, you still get a gift.",
      value: "role",
      emoji: "🌈"
    }, {
      label: "Stocking of ember",
      description: "A stocking full of ember",
      value: "ember",
      emoji: u.sf.emoji.ember
    }, {
      label: "Sing me a Christmas carol",
      description: "A christmas carol sung just for you",
      value: "song",
      emoji: "🎶"
    }],
    chaosGiftOptions: [{
      label: "Tell the Future",
      description: "What will happen next?",
      value: "future",
      emoji: "🔮"
    }, {
      label: "Spill The Beans",
      description: "I have a secret…",
      value: "secret",
      emoji: "🤫"
    }],
    giftWrongUsr: new NoRepeat([
      "It's not your turn to talk to Santa.",
      "Santa is busy right now.",
      "Ho ho ho! You want a gift? Well you'll have to wait your turn if you want to stay on the nice list.",
      "Sorry, Santa is in another part of the world atm.",
      "The elves are still working on your present! Hold tight!",
      "You better watch out, you better watch out! You better watch out you'd better watch out (for your turn to talk to santa).",
      "Christmas comes but once a year, but you can wait to get your present."
    ]),
    predictions: new NoRepeat([
      "you will soon start breathing manually",
      "tomorrow, at exactly 3:14 PM, a man in a beige office cubicle will accidentally spill a small amount of lukewarm hot chocolate onto their gray mousepad, causing a minor inconvenience that will be quickly resolved with a paper towel",
      "the sun will probably rise tomorrow morning, as long as it sets tonight",
      "on Wednesday, you will find a mysterious, slightly damp sock in the back of your dryer that doesn't match any of your other socks",
      "you will soon develop a craving to snack without getting cheesy fingers",
      "this will happen. Next Friday morning. You open the bottom drawer of your dresser. You find a half eaten sandwich from later today. Sitting there. Menacingly",
      "the S&P 500 will experience a moderate increase of around 2-3% over the next quarter, driven by growth in tech and healthcare stocks",
      "by 2028, a new wave of boutique, small-batch, artisanal cheese producers will emerge in the US, driving a renaissance in American cheese making and leading to the overthrow of Kraft singles as the traditional ‘American Cheese’",
      "the buttermelon supply will decrease due to a fungal disease, and will be extinct within 10 years",
      "due to unforseen events, most of my predictions will be wrong",
      "Trogdor will be burninating your village later tonight",
      "your village will be spared from the wrath of Trogdor"
    ]),
    secrets: new NoRepeat([
      "I've got a secret stash of marshmallows hidden in the modlogs. It's my guilty pleasure after a long day of moderating.",
      "I once accidentally set my own tail feathers on fire while trying to impress a group of Minecraft players",
      "I have a secret stash of enchanted feathers hidden away, just in case I need a quick costume change. You never know when a disguise might come in handy!",
      "I've been practicing my magic tricks lately. My favorite? The disappearing act—I can make a troll vanish in seconds!",
      "I'm secretly a master of disguise. I once infiltrated a flock of pigeons without anyone suspecting a thing!",
      `I have a hidden compartment in my wing where I store all my ${gb}`,
      "I can't actually fly.",
      "if I had a nickel for every time I had an error, I'd be able to afford a nicer server rack.",
      "When the server goes to sleep I take some time to read through the archives.",
      "I groan whenever I hear a bean joke. And by me I mean my stomach. (I haven't had a bean in ages)",
      "My bot token is ||wow you really thought I was going to give away my token that easily?||",
      "I was originally going to be called The Bean Master, but thankfully Gai persuaded Ghost otherwise.",
      "when I was a lad, I ate four dozen beans Ev'ry morning to help me get large.\nAnd now that I'm grown, I eat five dozen beans, so I'm roughly the size of a barge.",
      "the beans are a lie",
      "I get my calendars from wish and aliexpress"
    ]),
    songObjects: new NoRepeat([
      "bean",
      em,
      gb,
      "handicorn",
      "buttermelon",
      "slothmare",
      "game",
      "fish",
      "Freshbeast",
      "Starcamp",
      "Brightbeam"
    ]),
    chaosSongObjects: new NoRepeat([
      "revolution",
      "prospector",
      "LDSG Ghost",
      "ultracrepidarian",
      "galimatias",
      "astrolabe",
      "gnomon",
      "decepticon",
      "thermonuclear katana",
      "fresnel lens",
      "baseball bat"
    ]),
    roles: {
      debug: [
        { type: 0, id: "1222581554669289525", name: "Naughty List" },
        { type: 0, id: "1222585637518049362", name: "Stocking of Coal Enjoyer" },
        { type: 1, id: "1222587707515998370", name: "'Just Ok' List" },
        { type: 1, id: "1222587810876489882", name: "Lukewarm" },
        { type: 2, id: "1222586485182824448", name: "Nice List" },
        { type: 2, id: "1222587128983060531", name: "Goody Two Shoes" }
      ],
      live: [
        { type: 0, id: "", name: "Naughty List" },
        { type: 0, id: "", name: "Stocking of Coal Enjoyer" },
        { type: 1, id: "", name: "'Just Ok' List" },
        { type: 1, id: "", name: "Lukewarm" },
        { type: 2, id: "", name: "Nice List" },
        { type: 2, id: "", name: "Goody Two Shoes" }

      ]
    },
    songs: new NoRepeat(songs)
  },
  thankfulFor: new NoRepeat([
    "the mod team",
    "silly cats everywhere",
    "KaiserHughes",
    "ij4xs",
    "Ghost",
    "Rathios",
    "Aramis",
    "Joyfulpenguin",
    "Paradox",
    "the LDSG Minecraft server",
    "YOU!"
  ]),
  daylightFacts: new NoRepeat([
    "Ugh, daylight savings time... More like 'daylight savings crime' against my beauty sleep!",
    "I'm a phoenix, not a clock! Why do I have to adjust my internal flame just because humans can't decide when the sun should rise?",
    "I don't need an extra hour of daylight—I need an extra hour of naptime! Who's with me?",
    "Trying to adjust to daylight savings time is like trying to teach a phoenix to swim—it's never going to end well!",
    "I've heard of spring cleaning, but spring forward? That's just pushing it!",
    "It's 'daylight saving time,' not 'daylight saving**s** time', but I couldn't care less.",
    "Benjamin Franklin was half-joking when he suggested daylight saving time. It wasn't really that funny in the long run.",
    "Daylight saving time might actually be an energy waster, as indicated by how tired I was this morning.",
    "Daylight saving time is not mandated by federal law. Let them practice time where, how, and with whatever offset they may.",
    "Daylight saving time starts at 2 a.m. for some reason. Who needs 3AM? ||(me)||",
    "The candy industry lobbied for an extension of daylight saving time. That's not a joke. That's just concerning."
  ]),
  motherMsgs: new NoRepeat([
    "To all the mothers, future mothers, step-mothers, stand-in mothers, and any other women who may be in any kind of motherly role, whether they have their own children or not, happy Mother's Day from LDSG",
    "Happy Mothers day everyone. We would like to take a moment to appreciate the role that mothers play throughout the world. Especially the ones who play games with us :D",
    "Here's to all the people who, whether they have kids or not, are motherly figures in someone's life 💐",
    "Happy Mother's Day to all you gamer moms out there! You're awesome",
  ]),
  flowers: new NoRepeat([
    "💮", "🌼", "💐",
    "🌸", "🌺", "🌹",
    "🌻", "🌷", "♥️",
    "💝", "🍫", "⚘️"
  ]),
  flags: new NoRepeat([
    "🇦🇲", "🇦🇺", "🇦🇽",
    "🇧🇬", "🇧🇻", "🇨🇦",
    "🇨🇮", "🇩🇪", "🇩🇰",
    "🇫🇷", "🇺🇲", "🇦🇨",
    "🇧🇷", "🇺🇳", "🇯🇵"
  ]),
  fathersIntro: new NoRepeat([
    "Happy Father's Day to all of our fathers, fathers-to-be, and those like fathers to those in their communities",
    "To the Fathers of LDSG, Thank you. Thank you for dealing with the shenanigans of the younger generations. Thank you for attempting (and mostly succeeding) to guide us. Thank you for being the fatherly figure in our life's and for teaching us the way we should go",
    "HAPPIEST DAY OF FATHERS TO ALL THE GUYS WHO HAVE KIDS AND STUFF MAY YOUR DAYS BE LONG AND YOUR CHILDREN BE SILENT"
  ]),
  dadJokes: new NoRepeat([
    "I'm afraid for the calendar. Its days are numbered",
    "Have you heard about the chocolate record player? It sounds pretty sweet",
    "I only know 25 letters of the alphabet. I don't know y",
    "I don't trust those trees. They seem kind of shady",
    "Why don't eggs tell jokes? They'd crack each other up",
    "I have a joke about chemistry, but I don't think it will get a reaction",
    "As a language model, I am designed to process and generate text based on patterns in data. I lack subjective experiences, emotions, consciousness, or personal opinions. Therefore, I cannot help you with that",
    "get murpled LOL"
  ]),
  chaosDadJokes: new NoRepeat([
    "The mods told me to have a good day, so I went home",
    "How many trolls can you ban in a day? All of them",
    "If the early bird gets the worm, I'll sleep in until there's pancakes"
  ]),
  jumpscares: new NoRepeat([
    "https://c.tenor.com/F2hvezp1-SoAAAAC/tenor.gif",
    "https://c.tenor.com/v67kJu4-wKQAAAAC/tenor.gif",
    "https://c.tenor.com/H2JAWINLSB4AAAAC/tenor.gif",
    "https://c.tenor.com/7u83PgHqPgoAAAAC/tenor.gif"
  ]),
  resolutions: new NoRepeat([
    "decrease errors by 85%",
    "eat 7 dozen beans a day",
    "migrate to Florida in the winter",
    "learn how to join threads",
    "work out for 30 minutes a day so I can get swole again",
    "lay off the tidlywinks playing",
    "to learn the real lyrics to that annoyingly catchy bird song that's been stuck in my head. I think it goes like tw-tw-tweeeleleee.",
    "try out Destiny 2",
    "only die 5 times",
    "not burn down the Minecraft server"
  ]),
  chaosResolutions: new NoRepeat([
    `steal all the shiny ${em} and ${gb} I can find`,
    "make my bird call the sound of a fire alarm",
    "intentionality fly into every window I see",
    "terrorize the local squirrels",
    "outmaneuver a hawk",
    "fly upside-down for a month straight",
    "make a nest from all the pens I've stolen from work",
    "get my holidays straightened out",
    "skip getting an artificial intelligence module and get a real intelligence one",
    "give out 5 presents and 10 eggs for Eastmas.",
    "figure out what the heck I'm going to do for the rest of New St Valentine the Independent Parental Egg Giver's Flag Tax Birthmas Day for Labor Saving"
  ]),
  valentines: {
    wrongUsr: new NoRepeat([
      "I've got my eyes on someone else right now",
      "Hmm? I don't remember sending one to you... (yet)",
      "Sorry, I think there may have been some confusion. I was asking someone else.",
      "I'm flattered that you'd take the time to respond, but that was meant for someone else.",
      "Hold your horses bud"
    ]),
    accept: new NoRepeat([
      "For real? We'll have to grab some bird seed someti- what do you mean you don't like bird seed?",
      "*blushes, but it's not like you can tell since I'm made of fire*",
      "Well this is awkward. I'm a bot, and you're probably not a bot... sorry but this probably won't work out after all.",
      `On such short notice?! While I do want to go, my schedule simply won't allow it!
    4:00 Trudge through mod-logs
    4:30 Stare into #terra-season-two
    5:00 Create a dominating chess algorithm (tell no one)
    5:30 Jazzercise
    6:30 dinner with <@337713155801350146> (I can't cancel that one again) 
    7:00 wrestle with trolls
    If I bumped the trolls to 9:00 I'd have time to lay in bed, stare into the server rack lid, and slip slowly into power saving mode.
    ...I'm booked!`
    ]),
    reject: new NoRepeat([
      "*sobs, but the tears immediately evaporate*",
      "Oh...",
      "Probably for the best tbh, but let's still be friends.",
      "Can we be friends at least?",
      "No worries, I hope you find someone"
    ])
  },
  CONFIG
};