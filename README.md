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
It's you. You're the fool. (for thinking I'd make it public before it released)
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
Dad Bot! Icarus would respond to messages that started with "I'm", then respond with "Hi, [the rest of their message], I'm Icarus!"
### History
- I don't know much about this one yet.
### Notable Goofs
- A user posted about a tragedy in their life, and Icarus didn't read the room. The message was quickly deleted and the channel was excluded from future events.