import { Artifact } from '.'
import { GenericArtifactMorningView } from '../../components/artifact/genericMorningView'

export const ShroudOfShame = Artifact({
  type: 'shroud of shame',
  title: 'Shroud of shame',
  description:
    'Each day at dawn choose a player who must face away from the rest of the players.',
  infinite: true,
  ActivateView: null,
  MorningView: GenericArtifactMorningView,
})
