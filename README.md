## Setup

First copy `.env.template` to `.env` and fill in the missing variables

```
nvm use
npm start
```

# Components

- Some type of grid system

# Werewolf

I want to remake werewolf with a few things in mind

- Certain actions should be doable by the players (inspecting, artifacts happen)
- Better game experience for players (joining, roles are more stable, spectate modes)
- I want deaths to happen automatically (as much as possible)

## Things to note

Make sure artifact doppleganger makes you call out the player by name
Make sure artifact diseased reminds the narrator
Allow players to play and use their artifacts (for inspection or passing)
Have a list of reminders for the narrator with artifacts
Separate the different ways you can kill and make them context aware
Artifact Prism make sure they can do the
Breath of old man works as expected

## Werewolf Options

- Artifacts
  - Werewolf doesn't need to be played for it to be active

Game Rules - Time limit - Flip / No-Flip - Ghost

- Role Mods
  - Priest
    - blessing dies with the priest
    - protects against all calamities (chewks, vampires, boogyman)
  - Diseased
    - protects against all calamities (chewks, vampires, boogyman)
  - Bodyguard
    - protects against all calamities (chewks, vampires, boogyman)
  - Vampire
    - bite kills by any seconding / bite kills when they are seconded (persists thru entire game)
