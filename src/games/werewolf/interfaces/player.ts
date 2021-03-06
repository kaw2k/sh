import { Player, PlayerId } from '../../../interfaces/player'
import { Roles } from './card/cards'
import { ArtifactState } from './artifact'

export interface PlayerWerewolf extends Player {
  ready: boolean
  alive: boolean
  role: Roles
  // Sometimes a player can gain a secondary role.
  // If that is the case they wake up by name
  secondaryRole: Roles | null
  artifacts: ArtifactState[]

  // If I die, these people die too
  linkedTo: PlayerId[]

  // Role specifics
  inCult: PlayerId[]
  isGuarded: boolean
  markedByAlphaWolf?: boolean
  copiedBy: PlayerId | null
  isBlessed: false | PlayerId | 'attacked'
  areBrainsEaten: boolean
  sasquatchWakesUp: false | 'transforming' | 'wolf'

  state: { [key: string /* role */]: any }
}
