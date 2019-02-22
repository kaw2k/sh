import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { useCommonStyles } from '../../../../../helpers/commonStyles'
import { ActionRow } from '../../../../../components/actionRow'
import { Button } from '../../../../../components/button'
import { PlayerId } from '../../../../../interfaces/player'
import { DayPlayer } from './day/player'

interface Props {}

type View = { type: 'day player'; player: PlayerId } | { type: 'day' }

export const WerewolfModeratorGame: React.SFC<Props> = () => {
  const [view, setView] = React.useState<View>({ type: 'day' })
  const { game } = React.useContext(WerewolfGameContext)
  const classes = useCommonStyles()

  console.log(game)

  if (view.type === 'day player') {
    return (
      <DayPlayer
        player={game.players[view.player]}
        done={() => setView({ type: 'day' })}
      />
    )
  }

  return (
    <>
      <div className={classes.twoColumns}>
        {values(game.players).map(player => (
          <WerewolfProfile
            alignItems="flex-start"
            showRole
            showLiving
            key={player.id}
            player={player}
            onClick={() => setView({ type: 'day player', player: player.id })}
          />
        ))}
      </div>

      <ActionRow fixed>
        <Button color="green" confirm>
          start night
        </Button>
      </ActionRow>
    </>
  )
}
