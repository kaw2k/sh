import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { passArtifact, updateArtifact } from '../actions'
import { getArtifact } from './artifacts'
import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const ActivateView: PromptView<ByArtifact> = ({ done, prompt: { player } }) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(BloodOfTheDiseased.type)

  return (
    <ChooseWerewolfPlayer
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive)}
      doneText="make diseased"
      onDone={([target]) => {
        done([
          updateArtifact({
            target: player,
            artifact: BloodOfTheDiseased.type,
            updates: {
              activated: 'played',
            },
          }),
          passArtifact({
            artifact: BloodOfTheDiseased.type,
            source: player,
            target: target.id,
          }),
        ])
      }}
    />
  )
}

export const BloodOfTheDiseased = Artifact({
  type: ArtifactType('blood of the diseased'),
  title: 'Blood of the Diseased',
  category: 'Imitate Role',
  description:
    'Choose a player to become infected with disease. If the werewolves eliminate that player, they do not get to choose a target the following night.',
  infinite: true,
  ActivateView,
})
