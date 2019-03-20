import * as React from 'react'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'
import values from 'ramda/es/values'
import { WerewolfProfile } from '../../../../components/werewolfProfile'
import { sortBy } from 'ramda'
import { useCommonStyles } from '../../../../../../helpers/commonStyles'
import { Typography } from '@material-ui/core'
import { getCard } from '../../../../interfaces/card/cards'
import { count } from '../../../../../../helpers/count'
import { Profile } from '../../../../../../components/profile'
import { getArtifact } from '../../../../interfaces/artifact/artifacts'
import uniq from 'ramda/es/uniq'

export const WerewolfPlayerDayOverview: React.SFC = ({}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const classes = useCommonStyles()

  return (
    <>
      <div className={classes.twoColumns}>
        {sortBy(p => !p.alive, values(game.players)).map(player => (
          <WerewolfProfile
            alignItems="flex-start"
            showRole={!game.options.noFlip && !player.alive}
            showLiving
            key={player.id}
            player={player}
          />
        ))}
      </div>

      <Typography variant="h2">Possible Roles</Typography>
      <Typography gutterBottom component="em">
        Not all these roles may be in the game, but the number present ar the
        upper limit. Note if someone changes their role, there may be an
        unlisted role in the game.
      </Typography>
      {uniq(game.initialRoles).map(role => {
        const card = getCard(role)
        const numCard = count(game.initialRoles, r => r === card.role)
        return (
          <Profile
            key={card.role}
            text={`${card.role}: ${numCard}`}
            image={card.profile}
            alignItems="flex-start"
            subtext={card.description}
          />
        )
      })}

      <Typography variant="h2">Possible Artifacts</Typography>
      <Typography gutterBottom component="em">
        Not all these artifacts may be in the game, and there may be more than
        those listed here.
      </Typography>
      {game.initialArtifacts.map(artifactType => {
        const artifact = getArtifact(artifactType)
        return (
          <Profile
            key={artifact.type}
            alignItems="flex-start"
            text={artifact.title}
            subtext={artifact.description}
          />
        )
      })}
    </>
  )
}
