import { curry } from 'ramda'
import { WerewolfGame } from '../interfaces/game'
import { Unpack } from '../../../helpers/unpack'

export const addAction = curry(
  (
    actions: Unpack<WerewolfGame['actions']> | WerewolfGame['actions'],
    game: WerewolfGame
  ): WerewolfGame => {
    return {
      ...game,
      actions: game.actions.concat(actions),
    }
  }
)

export const addDelayedAction = curry(
  (
    delayedActions:
      | Unpack<WerewolfGame['delayedActions']>
      | WerewolfGame['delayedActions'],
    game: WerewolfGame
  ): WerewolfGame => {
    return {
      ...game,
      delayedActions: game.delayedActions.concat(delayedActions),
    }
  }
)
