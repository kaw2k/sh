import * as React from 'react'
import { SecretHitlerGameContext } from '../../../../../helpers/contexts'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { values } from 'ramda'

export const Kill: React.SFC<{}> = () => {
  const { endGame, updateGame, updateGamePlayer, game } = React.useContext(
    SecretHitlerGameContext
  )

  return (
    <ChoosePlayers
      title="Who do you want to kill?"
      doneText="kill"
      players={values(game.players).filter(p => p.living)}
      removePlayer
      onDone={async ([pid]) => {
        const p = game.players[pid]
        if (p.role.isHitler) {
          endGame(
            'liberal',
            `${p.name || p.name} was killed and is hitler, liberals win!`
          )
        } else {
          updateGamePlayer({ ...p, living: false })
          updateGame({ performPower: null })
        }
      }}
    />
  )
}
