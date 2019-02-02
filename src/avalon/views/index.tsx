import * as React from 'react'
import values from 'ramda/es/values'
import { Room } from '../../interfaces/room'
import { Avalon, Party as AvalonParty } from '../interfaces/game'
import { LobbyAvalon } from './lobby'
import { RoomContext, AvalonGameContext } from '../../helpers/contexts'
import { GameSetup } from './gameSetup'
import { PlayerAvalon } from '../interfaces/player'
import { addLeaderBoard } from '../../apis/leaderBoard'
import { assignRoles } from '../helpers/assignRoles'
import { GameView } from './game'
import { shuffle } from '../../helpers/shuffle'
import { getBoardEffect } from '../helpers/getBoardEffect'
import { Spectate } from './game/spectate'

export const isAvalon = (room: Room): room is Avalon =>
  room.type === 'avalon-game' || room.type === 'avalon-lobby'

export const AvalonView: React.SFC<{ room: Avalon }> = ({ room }) => {
  const { player, setRoom, updatePlayer, updateRoom } = React.useContext(
    RoomContext
  )

  // Game screens
  if (room.type === 'avalon-lobby') {
    return (
      <LobbyAvalon
        lobby={room}
        startGame={players => {
          const first = shuffle(players)[0]
          const firstPlayer = first.name || first.id
          let message = `${firstPlayer} goes first.`
          if (room.ladyOfTheLake) {
            message += ` The person to ${firstPlayer}'s right gets to claim lady of the lake.`
          }

          setRoom({
            type: 'avalon-game',
            id: room.id,
            chaos: 0,
            ladyOfTheLake: room.ladyOfTheLake,
            nextLadyOfTheLake: null,
            lobbyPlayers: room.lobbyPlayers,
            currentMission: null,
            players: assignRoles(room.lobbyPlayers, room.roles),
            roles: room.roles,
            missionResults: [],
            message,
          })
        }}
      />
    )
  }

  const currentPlayer = room.players[player.id]
  const allReady = values(room.players).reduce(
    (memo, p) => memo && p.ready,
    true
  )

  function endGame(party?: AvalonParty, message?: string) {
    setRoom({
      id: room.id,
      type: 'avalon-lobby',
      lobbyPlayers: room.lobbyPlayers || [],
      victoryMessage: message || null,
      ladyOfTheLake: room.ladyOfTheLake,
      roles: room.roles,
    })

    if (party && room.type === 'avalon-game') {
      addLeaderBoard({
        date: Date.now(),
        gameType: 'avalon-game',
        winners: values(room.players)
          .filter(p => p.party === party)
          .map(p => ({ id: p.id, role: p.role })),
        losers: values(room.players)
          .filter(p => p.party !== party)
          .map(p => ({ id: p.id, role: p.role })),
      })
    }
  }

  if (!currentPlayer) {
    return <Spectate game={room} endGame={endGame} />
  }

  if (!allReady) {
    return (
      <GameSetup
        player={currentPlayer}
        game={room}
        endGame={() => {
          setRoom({
            id: room.id,
            type: 'avalon-lobby',
            lobbyPlayers: room.lobbyPlayers,
            victoryMessage: null,
            ladyOfTheLake: room.ladyOfTheLake,
            roles: room.roles,
          })
        }}
        ready={() => {
          const updatedPlayer: PlayerAvalon = { ...currentPlayer, ready: true }
          updatePlayer(updatedPlayer)
        }}
      />
    )
  }

  const { fail, people } = getBoardEffect(room.players, room.missionResults)
  return (
    <AvalonGameContext.Provider
      value={{
        updateGame: updateRoom,
        game: room,
        player: currentPlayer,
        failsNeeded: fail,
        playersNeeded: people,
        updateGamePlayer: updatePlayer,
        endGame,
      }}>
      <GameView />
    </AvalonGameContext.Provider>
  )
}
