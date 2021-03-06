import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { getArtifact } from './artifacts'
import { updateArtifact, destroyArtifact, passArtifact } from '../actions'
import { PlayerId } from '../../../../interfaces/player'
import { values } from 'ramda'
import contains from 'ramda/es/contains'
import { PromptView, ByArtifact } from '../prompt'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { ArtifactType } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

export const ArtifactMorningView: PromptView<ByArtifact> = ({
  done,
  prompt: { artifact: artifactState, player: playerId },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  const previousPlayers: PlayerId[] = artifactState.state || [playerId]
  const living = values(game.players).filter(p => p.alive)
  const remaining = living.filter(p => !contains(p.id, previousPlayers))

  if (!remaining.length) {
    return (
      <>
        <Typography gutterBottom variant="h2">
          {artifact.title}
        </Typography>
        <Typography gutterBottom>{artifact.description}</Typography>

        <ActionRow fixed>
          <Button
            color="red"
            onClick={() => {
              done([
                destroyArtifact({
                  target: playerId,
                  artifact: artifactState.type,
                }),
              ])
            }}>
            destroy
          </Button>
        </ActionRow>
      </>
    )
  }

  return (
    <>
      <Typography gutterBottom variant="h2">
        {artifact.title}
      </Typography>
      <Typography gutterBottom>{artifact.description}</Typography>

      <ChooseWerewolfPlayer
        doneText="pass amulet"
        players={remaining}
        onDone={([target]) => {
          done([
            updateArtifact({
              artifact: artifactState.type,
              target: playerId,
              updates: {
                state: previousPlayers.concat(target.id),
              },
            }),
            passArtifact({
              target: target.id,
              source: playerId,
              artifact: artifactState.type,
            }),
          ])
        }}
      />
    </>
  )
}

export const AmuletOfProtection = Artifact({
  type: ArtifactType('amulet of protection'),
  title: 'Amulet of Protection',
  category: 'Misc',
  description:
    'Each day at dawn the holder of the Amulet must give it to a player who has not had it before. The player who has the Amulet cannot be eliminated.',
  infinite: true,
  MorningView: ArtifactMorningView,
})
