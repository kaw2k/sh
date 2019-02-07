import { Opaque } from './opaque'
import { SecretHitler } from '../games/secret-hitler/interfaces/game'
import { Player } from './player'
import { Avalon } from '../games/avalon/interfaces/game'

export type RoomId = Opaque<'Room ID', string>
export type Room = Lobby | SecretHitler | Avalon

export interface Lobby {
  type: 'lobby'
  id: RoomId
  lobbyPlayers: Player[]
  victoryMessage?: string | null
}
