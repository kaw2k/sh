import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import contains from 'ramda/es/contains'
import { indoctrinate } from '../actions'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { PromptView } from '../prompt'
import { CardRole } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const nightTitle = `Cult leader, wake up! Indoctrinate someone, they are now in your cult.`

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)
  const player =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!player)
    return <NoNightActionView done={() => done([])} data={nightTitle} />

  return (
    <>
      <NightViewBase done={done} title={nightTitle} prompt={prompt}>
        <ChooseWerewolfPlayer
          doneText="indoctrinate"
          onDone={([target]) => {
            done([indoctrinate({ target: target.id, source: player })])
          }}
          players={values(game.players).filter(
            p => !contains(player, p.inCult) && p.alive && p.id !== player
          )}
        />
      </NightViewBase>
    </>
  )
}

export const CultLeader = Card({
  role: CardRole('cult leader'),
  weight: 1,
  team: 'cult leader',
  emoji: Emoji('🍷'),
  cardCount: 1,
  description: `Every night wake up to indoctrinate people into your cult. You win if all living players are in your cult.`,
  hints: [
    `Indoctrinate people who you think won't die early`,
    `Your cult dies with you, so DON'T come out as the cult leader. You are a high priority role to kill.`,
  ],
  SetupRoleView: GenericSetupRoleView,
  image: require('../../static/cult-leader.png'),
  profile: require('../../static/cult-leader-profile.png'),
  randomlySelectable: true,
  appearsBad: always(false),
  night: {
    title: nightTitle,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.misc,
  },
})
