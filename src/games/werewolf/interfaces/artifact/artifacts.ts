import { BloodOfTheDiseased } from './bloodOfTheDiseased'
import { ScepterOfRebirth } from './scepterOfRebirth'
import { SkimmerOfTheCursed } from './skimmerOfTheCursed'
import { OnyxOfDestruction } from './onyxOfDestruction'
import { OrbOfSpeculation } from './orbOfSpeculation'
import { Artifact } from '.'
import { ShroudOfShame } from './shroudOfShame'
import { MirrorOfTheDoppleganger } from './mirrorOfTheDoppleganger'
import { BreathOfTheOldMan } from './breathOfTheOldMan'
import { ShieldOfTheBodyguard } from './shieldOfTheBodyguard'
import { VoidOfNothingness } from './voidOfNothingness'
import { BowOfHunting } from './bowOfHunting'
import { ClawOfTheWerewolf } from './clawOfTheWerewolf'
import { CitrineOfFortune } from './citrineOfFortune'
import { WreathOfPeace } from './wreathOfPeace'
import { VoteFromBeyond } from './voteFromBeyond'
import { StaffOfTheSeer } from './staffOfTheSeer'
import { AmuletOfProtection } from './amuletOfProtection'
import { DiaryOfTheInsomniac } from './diaryOfTheInsomniac'
import { StoneOfAlteration } from './stoneOfAlteration'
import { RodOfReincarnation } from './rodOfReincarnation'
import { AmethystOfKnowledge } from './amethystOfKnowledge'
import { RubyOfKismet } from './rubyOfKismet'

export const Artifacts = [
  BloodOfTheDiseased,
  ScepterOfRebirth,
  SkimmerOfTheCursed,
  OnyxOfDestruction,
  OrbOfSpeculation,
  ShroudOfShame,
  MirrorOfTheDoppleganger,
  BreathOfTheOldMan,
  ShieldOfTheBodyguard,
  VoidOfNothingness,
  BowOfHunting,
  ClawOfTheWerewolf,
  CitrineOfFortune,
  WreathOfPeace,
  VoteFromBeyond,
  StaffOfTheSeer,
  AmuletOfProtection,
  DiaryOfTheInsomniac,
  StoneOfAlteration,
  RodOfReincarnation,
  AmethystOfKnowledge,
  RubyOfKismet,
]
export type Artifacts = (typeof Artifacts)[0]['type']

export function getArtifact(type: Artifacts): Artifact<Artifacts> {
  return Artifacts.find(artifact => artifact.type === type) as Artifact<
    Artifacts
  >
}
