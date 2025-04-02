<div align="center">
  <h1>LDSG April Fools</h1>
  The big funny
</div>
<br/>
<br/>
Ever wanted to see the behind the scenes on some of the things we've done for April Fools? Well here you go!
<br/>
<br/>

# Fools over the years
## 2025
### Concept
Icarus got duolingo and decided to learn a language based on popular vote. Pirate Speak ended up winning, so he spoke in that language all day. To help showcase the translation, certain commands, such as `!roastme`, `!roastchannel`, `!birdfact`, and `!excuse` were added to generate large bits of AI or procedurally generated text. In addition, all channel names were changed to be pirate themed, and old newspaper ads were photoshopped and played occasionally.
### Developer
[BobbyTheCatfish](https://github.com/bobbythecatfish)

### History
- Discussion began on February 12th.
- The `!excuse` system was already in use by BobbyTheCatfish in a personal bot, and was suggested by Chickenfried to be implemented in the April Fools event.
- Incognito brought up the idea of roasting with AI.
  > If we're bringing chatGPT into the mix, we should have Icarus ask chatGTP to roast either the game or the topic the channel is related to at random times.
- Saidenmaster and JoyfulPenguin brought up the ideas ultimately used for `!birdfact`
  > Have Icarus send bird facts in channels
  
  > "reply "STOP" to unsubscribe" and anyone who replies gets added to a pingable "bird facts" role
- Ultimately, the biggest part was brought up by OrrinJelo.
  > Change LDSG Official language to pirate/pig latin for the day.
- BobbyTheCatfish provided the last few ideas such as doing a poll, doing voice channel shenanigans, and running ads.
- Development started shortly after, and details were mostly kept secret from the rest of the server, including Team.
- Development on the translation API started on the 14th, and was mostly done at that point.
- AI features and `!excuse` were mostly completed by the 15th, with ads being sourced and finalized through the 17th.
- On March 26th, a special survey banner was set and a language poll was released in `#announcements`.
- The poll finished on the 29th and revealed that Pirate Speak was going to be the official language for April Fools.
- On the 29th, ads were photoshopped to be in pirate speak, and code was reviewed to ensure functionality and proper grammer.
- On the 30th, a server logo and banner were created. Then a csv of channel ids, their current names, and pirate themed names was created from which the server channels would be renamed
### Notable Goofs
- Icarus only used about $0.01 worth of ChatGPT credits, leaving BobbyTheCatfish with $4.99 left to rot.
- While the fixed no-repeat system from the previous year was used, the bot had to be restarted several times, which caused some things to be repeated
- Later in the night, the translation system was changed to select a language at random while translating. This caused the `!trusted` command to provide a really funny response when in uwu mode.


## 2024
### Concept
Icarus switched between holidays every few hours, giving rewards and snarky comments based on the time of year he thought it was. In the early evening, 'Chaos Mode' was enabled, which stacked a new holiday on top of the current one(s) instead of switching between them. Some responses also became more unhinged.
### Developers
- [BobbyTheCatfish](https://github.com/bobbythecatfish)
- [OhGo](https://github.com/LDSGOhGo)
- [Gaiwecoor](https://github.com/gaiwecoor)
### History
- Started gathering ideas on March 9th
- On March 12th, Incognito suggests:
  > I don't know how much work it would be, but I like the idea of having Icarus get confused as to which holiday it is on April 1st. At random, Icarus might wish someone a Merry Christmas. Shout "Boo!" at others, "pinch" others for not wearing green etc. etc.

- Development started the same day with Gaiwecoor making a system for St. Patricks day, which involved detecting the average color of users' avatars. This was deployed on St. Patricks day as a test and fun standalone gimmick.
- Development continued until April 1st, with many holidays being added.
- Since BobbyTheCatfish was on his mission at the time, he had to write code in Google Docs and was severely limited in his availability. Despite this, OhGo was able to parse Bobby's pseudocode and deliver a product with minimal errors.
- The code has since been refined and split into several files to increase readability, bugs have been fixed, and code has been updated to be in line with [Icarus v5.5's codebase](https://github.com/LDS-Gamers-Studios/icarus5.5) as of early Feb. 2025.
### Notable Goofs
- The NoRepeat and cooldown systems, designed to prevent the same things from occurring right after each other, often failed. This led to user `cellistjudoka` being repeatedly given valentines cards. The system has since been fixed and turned into an [NPM Package](https://npmjs.org/@bobbythecatfish/no-repeat).

## 2023
### Concept
From what I can gather, the server got "corrupted", and all the channels started being renamed to #general. Some users even started changing their avatars and usernames to WuGing's to add to the corrupted nature of the server.
### Developer
[GuyInGrey](https://github.com/GuyInGrey)
### History
- The code for this wasn't saved, and the development history is hard to find.

## 2022
### Concept
Dodgeball! Every time someone sent a message, there was a 1/4 chance that Icarus would "throw a ball" (react with 🏐) at a user. The user then had a 2-6 second window to "dodge" (react with the same emoji). If they dodged in time, Icarus would give them a 🦆 reaction. Otherwise, Icarus would give them a 💥 reaction and send them to a 'prison' channel for an hour.
### Developer
- [Ryndinovia (Ryn)](https://github.com/LaughLax)
- [Gaiwecoor](https://github.com/gaiwecoor) may have helped
### History
- Not much is known about the planning or development at the moment, and likely won't ever be known since the testing server was deleted.
- Testing was done on March 31st.
- This was deployed on Icarus 5, but has since been updated to be in line with [Icarus v5.5's codebase](https://github.com/LDS-Gamers-Studios/icarus5.5) as of early Feb. 2025.

## 2021
### Concept
Something about getting sent to Ghost's office?

## 2020
### Concept
Dad Bot! Icarus would respond to messages that started with "I'm", then respond with "Hi, [the rest of their message], I'm Icarus!" and set the poster's nickname to the parsed bit of the message. There was also a cooldown of some sort that prevented you from this happening too often.
### History
- I don't know much about this one yet.
### Notable Goofs
- A user posted about a tragedy in their life, and Icarus didn't read the room. The message was quickly deleted and the channel was excluded from future events.