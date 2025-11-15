// @ts-check
const lolData = require("./lol.json");
const pirateData = require("./pirate.json");
const uwuData = require("./uwu.json");

const { CONFIG } = require("./config.js");

/*********************
 * TRANSLATION SETUP *
 *********************/

/** @type {[string, RegExp][]} */
const pirate = pirateData.map(w => [w.replacement, new RegExp("^([^a-z]*?)(" + w.triggers.join("|") + ")(ed|er)?(s)?([^a-z]*?)$", "i")]);

/** @type {[string|string[], RegExp][]} */
const lolReplacements = lolData.map(w => [w.replacement, new RegExp(w.search, "gi")]);

/** @type {[string, RegExp][]} */
const uwuReplacements = uwuData.uwuify.map(w => [w.replacement, new RegExp(w.search, "g")]);


/***************
 * TRANSLATORS *
 ***************/

/** @param {string} str */
function pigLatin(str) {
  const vowels = "aeiou".split("");
  const endingLetters = "htwny".split("");
  const letterTest = /[a-z']/i;

  const newWords = [];

  let oldStartIndex = -1;
  let newStartIndex = -1;
  let vowelStart = false;

  /**
   * RULES OF PIG LATIN
   * 0) add -ay to the end
   * 1) Foobar => Oobarfay // all consonant before first vowel get moved to the end
   * 2) Chow => Owchay // see 1
   * 3) Awesome => Awesomehay // if it starts with a vowel, add a random consonant before the ay
   * 4) My => Myay // if no vowels, keep it the same
   */
  
  const reset = () => {
      newStartIndex = -1;
      oldStartIndex = -1;
      vowelStart = false;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    // skip urls
    if (str.substring(i, i + 4).startsWith("http")) {
      const rest = str.substring(i);
      let endOfUrl = rest.search(" ");
      if (endOfUrl === -1) endOfUrl = rest.length - 1;

      newWords.push(rest.substring(0, endOfUrl));

      i += endOfUrl - 1;
      reset();
      continue;
    }

    const isLetter = letterTest.test(char);

    if (isLetter) {
      // mark start of word
      if (oldStartIndex === -1) oldStartIndex = i;
      
      // if vowel and first vowel not set (rule 1)
      if (newStartIndex === -1 && vowels.includes(char.toLowerCase())) {
        newStartIndex = i;
        // rule 3
        if (oldStartIndex === i) vowelStart = true;
      }
    }

    // if whitespace or end of text
    if (!isLetter || i === str.length - 1) {
      // if no text was found since last whitespace, just add it
      if (newStartIndex === -1 && oldStartIndex === -1) {
        newWords.push(str[i]);
      } else {
        // prevent last character from being put at the end
        if (i === str.length - 1 && isLetter) i++;
        
        if (newStartIndex === -1) newStartIndex = i;
        if (oldStartIndex === -1) oldStartIndex = i;

        // determine word case
        let originalWord = str.substring(oldStartIndex, i);
        const isUpper = originalWord.toUpperCase() === originalWord;

        // rule 3
        if (vowelStart) {
          let endLetter = rand(endingLetters) + "ay";
          if (isUpper) endLetter = endLetter.toUpperCase();

          newWords.push(str.substring(oldStartIndex, i) + endLetter + (str[i] ?? ""));
        } else {
          let newEnd = str.substring(oldStartIndex, newStartIndex);
          let newStart = str.substring(newStartIndex, i);

          // set new first letter to uppercase if old first letter was uppercase
          if (originalWord[0].toUpperCase() === originalWord[0] && !isUpper) {
            newStart = newStart[0].toUpperCase() + newStart.substring(1);
            newEnd = newEnd[0].toLowerCase() + newEnd.substring(1);
          }
  
          newWords.push(newStart + newEnd + (isUpper ? "AY" : "ay") + (str[i] ?? ""))
        }
      }

      reset();
    }
  }
  return newWords.join("");
}

/** @param {string} str */
function pirateSpeak(str) {
  const words = str.split(" ");
  for (const [replacement, trigger] of pirate) {
    for (let i = 0; i < words.length; i++) {
      const passed = trigger.exec(words[i]);
      if (passed) {
        let r = replacement;
        if (passed[2].toUpperCase() === passed[2]) r = r[0].toUpperCase() + r.substring(1);
        words[i] = (passed[1] ?? "") + r + (passed[3] ?? "") + (passed[4] ?? "") + (passed[5] ?? "");
      }
    }
  }
  return words.join(" ");
}

/** @param {string} str */
function uwu(str) {
  for (const [replacement, reg] of uwuReplacements) {
    str = str.replace(reg, replacement);
  }

  return str + " " + rand(uwuData.smiles);
}

/** @param {string} str */
function lol(str) {
  for (const [replacement, reg] of lolReplacements) {
    str = str.replace(reg, () => Array.isArray(replacement) ? rand(replacement) : replacement);
  }

  return str.toUpperCase();
}

/**
 * @template T
 * @param {T[]} arr
 * @returns {T}
 */
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/*********
 * UTILS *
 *********/

let language = "";

/** @param {string} newLanguage */
function setLanguage(newLanguage) {
  language = newLanguage;
}

function enabled() {
  return language !== "";
}

function langPicker() {
  if (!language) return null;

  switch (language) {
    case "pig": return pigLatin;
    case "pirate": return pirateSpeak;
    case "uwu": return uwu;
    case "lol": return lol;
    default: return null;
  }
}

function getLanguage() {
  return language;
}

/*****************
 * THE BIG THING *
 *****************/

/**
 * @param {{content?: string, embeds?: import("discord.js").EmbedBuilder[]}|string} options
 * @param {string} channelId
 */
function translate(options, channelId) {
  // don't mess with mod stuff
  if ([
    "1207046196481237062", "1207046241540640798", "1207046448303050794", "1207046143385542737", // testing
    "506575671242260490", "506577024958070824", "725797487129919488", "506575277820739611", "356657507197779968"// real
  ].includes(channelId)) return options;

  if (CONFIG.CONFIDENTIAL && !["925797283600150558", "1340123219683971162"].includes(channelId)) return options;

  // pick translation function
  const translator = langPicker();
  if (!translator) return options;

  // replace!
  if (typeof options === "string") {
    options = translator(options);
  } else {
    if (options.content) options.content = translator(options.content);
    if (options.embeds && options.embeds.length > 0) {
      options.embeds = options.embeds.map(e => {
        const d = e.data;
        if (d.title) e.data.title = translator(d.title);
        if (d.description) e.data.description = translator(d.description);
        if (d.author?.name) e.data.author = { ...d.author, name: translator(d.author.name) };
        if (d.footer?.text) e.data.footer = { ...d.footer, text: translator(d.footer.text) };
        if (d.fields && d.fields.length > 0) {
          e.data.fields = d.fields.map(f => ({
            name: translator(f.name),
            value: translator(f.value),
            inline: f.inline
          }));
        }
        return e;
      });
    }
  }
  return options;
}


module.exports = { translate, setLanguage, getLanguage, enabled };