// @ts-check
const NoRepeat = require("no-repeat");

const masc = "%"
const fem = "^"
const it = "!"
const neut = "?"

const possessive = "$"
const pronoun = "%"
const promptPerson = "#"

const work = {
  intros: new NoRepeat([
    "Greetings, fellow employee! I can't talk for long since",
    "Your email does, in fact, find me well. Unfortunately,",
    "You've caught me at an interesting time.",
    "I sincerely apologize for any inconvenience this may cause, but",
    "I regret to inform you that",
    "I appreciate your feedback. I'll have to get back to you though, because",
    "I understand how important this is to you, but",
    "Thank you for your patience. I've just discovered that",
    "I'm excited to more forward with this deal, but",
    "I appreciate your perspective. For now, we'll have to put this on hold since",
    "Unfortunately, my schedule is quite full at the moment.",
    "I'll circle back on this when I have more capacity to engage; ",
    "I appreciate your message, but I'll need to step away from this discussion for now;",
    "It's been great talking to you, but",
    "I gotta bounce,",
    "I wish I could talk, but",
    "I'd love to weigh in, but"
  ]),
  people: new NoRepeat([
    // % = masc, ^ = fem, ! = it, ? = neut
    `${fem}Susan in HR`,
    `${masc}our CEO, LDSG Ghost,`,
    `${neut}<@name> from accounting`,
    `${neut}my second manager three times removed`,
    `${masc}the IT guy who only appears when my computer works fine`,
    `${neut}the new guy, <@name>,`,
    `${neut}<@name>`,
    `${neut}<@name>`,
    `${neut}<@name>`,
    `${neut}someone named <@name> (who I swear doesn't even work here)`,
    `${fem}the printer technician`,
    `${masc}Paradox, the CEO's brother who's \"shadowing\" for the day,`,
    `${neut}<@name> from IT`,
    `${neut}<@name> from financial`,
    `${neut}my underqualified intern`,
    `${it}the office plant`,
    `${fem}Janet, Queen of Gossip,`,
    `${masc}Gaiwecoor from legal`,
    `${neut}the voice in my head`,
    `${neut}the Logistics team`,
    `${neut}the Public Affairs team`,
    `${neut}the Operations team`,
    `${neut}the Freshbeast department lead`,
    `${neut}the Starcamp department lead`,
    `${neut}the Brightbeam department lead`,
    `${masc}the mailman`,
    `${it}the printer`,
    `${neut}the entire company`,
    `${it}my lunch`,
  ]),
  excuses: new NoRepeat([
    // # = person, % = them, $ = their"
    `${promptPerson} has asked me to quit`,
    `${promptPerson} wants me to put ${possessive} fish in the microwave`,
    `I have to put out the fire from ${promptPerson} CC'ing the entire company`,
    `${promptPerson} needs me to help ${pronoun} unmute ${possessive} mic on a zoom call`,
    `${promptPerson} has challenged me to an arm-wrestling match for dominance over in the break room`,
    `${promptPerson} needs my expertise in deciphering ${possessive} own handwriting`,
    `${promptPerson} just locked themselves out of the office again, and I am ${possessive} only hope`,
    `${promptPerson} just spilled hot chocolate all over my lap`,
    `I've been in a \"quick chat\" with ${promptPerson} for a few hours at this point and I'm not sure when it'll end`,
    `${promptPerson} has requested that I fix ${possessive} stapler`,
    `${promptPerson} is doing parkour in the lounge and *someone*'s gotta stop ${pronoun}`,
    `${promptPerson} needs me to witness at the office water dispenser machine's funeral`,
    `${promptPerson} just started a passionate debate about whether a hot dog is a sandwich and I'm now legally required to participate.`,
    `${promptPerson} spotted a suspicious-looking squirrel outside and is insisting that it's a security risk`,
    `${promptPerson} accidentally sent an email saying \"see attached\" with no attachment and now we're all panicking`,
    `${promptPerson} wants to show me ${possessive} PowerPoint presentation on \"why pineapple belongs on pizza\"`,
    `${promptPerson} just said they wanted that report done yesterday`,
    `${promptPerson} just made an egregious typo in an email and I need to publicly shame ${pronoun}`,
    `${promptPerson} started explaining blockchain and now I fear I'll never leave`,
    `${promptPerson} just kicked off a brainstorming session with a trust fall exercise`,
    `${promptPerson} accidentally printed 300 copies of something and now we're playing office Jenga`,
    `I'm still recovering from the email ${promptPerson} just sent with \"per my last email\" in bold`,
    `${promptPerson} started using \"let's take this offline\" unironically and I need a moment to process`,
    `I'm currently watching ${promptPerson} attempt to assemble an office chair with nothing but stubbornness and a PDF`,
    `${promptPerson} just peer-pressured me into a team-building exercise`,
    `I was just enlisted by ${promptPerson} to track down the last remaining pack of decent office pens`,
    `${promptPerson} is pronouncing GIF wrong`,
    `it's ${promptPerson}'s birthday and we're trying to celebrate`,
    `I'm currently helping ${promptPerson} find an email they swear they sent but absolutely did not`,
    `I'm busy trying to decode the latest passive-aggressive Slack message from ${promptPerson}`,
    `${promptPerson} is currently explaining how AI is going to replace our jobs while asking me how to copy and paste`,
    `I'm actually having lunch with ${promptPerson} at the moment`,
    `${promptPerson} just informed me that the office goldfish is in critical negotiations with a rival tank`,
    `${promptPerson} has discovered a hidden passage behind the break room fridge and I simply must investigate`,
    `${promptPerson} just found an email from 2017 marked \"URGENT\" and we're trying to assess the damage`,
    `I'm busy watching ${promptPerson} ask for a promotion to, and I quote, \"Master of Digital Wizardry and Algorithm Sorcery\"`,
    `${promptPerson} insists we need a company-wide emergency response plan for the heat death of the universe`,
    `${promptPerson} just pitched a rebrand that involves replacing all vowels with the letter \"X\" and I need to stop them`,
    `${promptPerson} has activated their standing desk into battle mode and I need to defend myself`,
  ])
}

const play = {
  intros: new NoRepeat([
    "It's been great talking to you, but",
    "I gotta run,",
    "Look over there!",
    "Sorry to do this, but",
    "Sorry to interupt you, but",
    "I wish I could talk, but",
    "Sorry, I just got a text.",
    "Ahhh... Didn't you hear?",
    "Ey mate, i got to yeet yote out of this boat.",
    "Wait, is that… yeah!",
    "You're not going to believe this, but",
    "What in tarnation?!",
    "Good luck with that, but",
    "I've gotta make like a tree and leaf.",
    "Uhuh. yeah. that's really interesting. Hey listen,",
    "Well would ya look at that.",
    "Did you see this post on the discord? It says that",
    "Look. I'll be completely honest with you."
  ]),
  people: new NoRepeat([
    // % = masc, ^ = fem, ! = it, ? = neut
    `${masc}my dog`,
    `${fem}my mother`,
    `${fem}Franziska`,
    `${fem}Jane`,
    `${fem}Martha Stewart`,
    `${fem}Lara Croft`,
    `${fem}GLaDOS`,
    `${masc}Joe", "${masc}Tom", "${masc}Billy", "${masc}Fred", "${masc}Noah", "${masc}Minecraft Steve`,
    `${masc}LDSG Ghost`,
    `${masc}Santana`,
    `${masc}Gandalf the Grey`,
    `${masc}The Legend 27`,
    `${masc}Chuck Norris`,
    `${masc}ij4xs`,
    `${masc}Kai`,
    `${masc}joyfulpenguin`,
    `${masc}Aramis`,
    `${masc}OhGo`,
    `${masc}Murple`,
    `${masc}Gaiwecoor`,
    `${masc}Cave Johnson`,
    `${masc}Huddy`,
    `${neut}Zorp, Ruler of the Nine Cosmo's`,
    `${neut}a local boyband`,
    `${neut}a group of door-to-door salesmen`,
    `${neut}my high school basketball team`,
    `${neut}a member of the royal guard`,
    `${masc}a mall santa`,
    `${it}a snail`,
    `${it}my Harry Potter cardboard cutout`,
    `${neut}my imaginary girlfriend`,
    `${neut}<@name>`,
    `${neut}<@name>`,
    `${neut}<@name>`,
    `${neut}my car`,
    `${it}a hive of bees`,
    `${it}my friend's fridge`,
    `${neut}that one guy from that one show`,
    `${it}a sentient fish`,
    `${it}twitch chat`,
    `${masc}a Florida man`,
    `${fem}the Immortal God-Empress`,
    `${it}a sentient bottle of lotion`,
    `${neut}half of my D&D group`,
    `${it}a black hole`,
    `${it}an alien`,
    `${masc}JOHN CENA`,
    `${neut}a member of Freshbeast`,
    `${neut}a member of Starcamp`,
    `${neut}a member of Brightbeam`,
    `${it}the elusive and terrifying slothmare`,
    `${it}my buttermelon sandwich`,
    `${it}Jerry's pet handicorn`,
  ]),
  excuses: new NoRepeat([
    // # = person, "% = them, $ = their",
    `${promptPerson} is invading <@channel> and I gotta go watch`,
    `${promptPerson} just broke into my house`,
    `${promptPerson} just crashed my car and needs me to give ${pronoun} a ride`,
    `${promptPerson} just came back to life`,
    `${promptPerson} just fell in my pool`,
    `${promptPerson} is trying to split an atom in my backyard`,
    `${promptPerson} just got assaulted by the mailman and needs backup`,
    `I gotta help ${promptPerson} figure out how to navigate ${possessive} college website`,
    `${promptPerson} just lost ${possessive} ankles`,
    `I have to get ${promptPerson} off ${possessive} phone`,
    `${promptPerson} just failed a captcha for the 5th time`,
    `${promptPerson} is doing a handstand`,
    `${promptPerson} just stared breakdancing`,
    `${promptPerson} just died of dysentery`,
    `${promptPerson} just got me that new game I've been wanting to play`,
    `${promptPerson} is trying to use PHAROS to print`,
    `${promptPerson} is trying to optimize Surge Alloy production`,
    `${promptPerson} is doing a handstand on my dog`,
    `${promptPerson} just reported me to the IRS`,
    `${promptPerson} just ate my homework`,
    `${promptPerson} downloaded Destiny 2 and is challanging me`,
    `${promptPerson} is trying to summon the !beandemon. I gotta stop ${pronoun}`,
    `${promptPerson} just broke through my trampoline`,
    `${promptPerson} committed a crime and is trying to frame me for it`,
    `${promptPerson} has declared that all our base belong to ${pronoun}`,
    `${promptPerson} is trying to eat my pizza rolls`,
    `${promptPerson} needs my help to convince Tod Howard to port Skyrim again`,
    `${promptPerson} has a sword and is running here at mach 2`,
    `${promptPerson} is putting too much flour into ${possessive} cake`,
    `${promptPerson} has been perfecting ${possessive} taco recipe and I gotta try it`,
    `${promptPerson} grabbed a flamethrower and set <@channel> ablaze. Do you have any hotdogs by chance?`,
    `${promptPerson} wants me to help ${pronoun} jump-scare the mailman!`,
    `${promptPerson} just jumped the fence and is crouch jumping into the sunset`,
    `${promptPerson} is going to be late for dance class unless I give ${pronoun} a ride`,
    `${promptPerson} is hovering ${possessive} finger over the \"purge members\" button`,
    `${promptPerson} has fallen into the river in Lego City`,
    `${promptPerson} wants to bike 12 hours to the beach and I have to go with ${pronoun}`,
    `${promptPerson} is trying to tag me`,
    `${promptPerson} is trying to recruit me`,
    `${promptPerson} is contacting me about my car's extended warranty`
  ])
};

/**
 * @param {string} channelName
 * @param {string} userName
 */
function generateExcuse(channelName, userName) {
  const workMode = Math.random() > 0.5;
  const set = workMode ? work : play;

  const intro = set.intros.getRandom();
  let person = set.people.getRandom();
  let excuse = set.people.getRandom();

  const personPronoun = person[0];

  let them = "them";
  let their = "their";

  switch (personPronoun) {
    case masc: them = "him"; their = "his"; break;
    case fem: them = "her"; their = "her"; break;
    case it: them = "it"; their = "its"; break;
    default: break;
  }

  person = person.substring(1);
  if (/[.!?]$/.test(intro) && excuse[0] === promptPerson) {
    person = person[0].toUpperCase() + person.substring(1);
  }

  excuse = excuse
    .replaceAll(pronoun, them)
    .replaceAll(possessive, their)
    .replaceAll(promptPerson, person)
    .replace(/<@channel>/, channelName)
    .replace(/<@name>/, userName);

  return `${intro} ${excuse}${workMode ? "." : "!"}`;
}

module.exports = { generateExcuse };