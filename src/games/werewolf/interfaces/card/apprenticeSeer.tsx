import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { getCard, isRole } from './cards'
import { count } from '../../../../helpers/count'
import { PromptView } from '../prompt'
import { CardRole } from '../../../../helpers/id'
import { Seer } from './seer'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const title = 'Apprentice Seer, wake up!'
const description = 'If the seer is dead, you get to inspect someone.'

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)

  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  const seers = count(game.players, p => p.alive && isRole(p, Seer.role))

  if (!playerId || seers) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  return (
    <NightViewBase prompt={prompt} title={title} done={done}>
      <ChooseWerewolfPlayer
        doneText="inspect"
        description={description}
        players={values(game.players).filter(p => p.alive)}
        onDone={([target]) => {
          const isPrimaryBad = getCard(target.role).appearsBad(target, game)
          const isSecondaryBad = !target.secondaryRole
            ? false
            : getCard(target.secondaryRole).appearsBad(target, game)
          const isBad = isPrimaryBad || isSecondaryBad

          alert(`${target.name || target.id} is ${isBad ? 'bad' : 'good'}`)
          done([])
        }}
      />
    </NightViewBase>
  )
}

export const ApprenticeSeer = Card({
  role: CardRole('apprentice seer'),
  weight: 4,
  team: 'villagers',
  emoji: Emoji('🧖‍'),
  cardCount: 1,
  description: `You become the Seer if they're eliminated. Each night, you get to wake up and inspect if someone is on the werewolf team or not.`,
  hints: [],
  image: require('../../static/apprentice-seer.png'),
  profile: require('../../static/apprentice-seer-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  randomlySelectable: true,
  appearsBad: always(false),
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
