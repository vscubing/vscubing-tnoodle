import { $ } from 'bun'

export const tnoodleCliVersion = 'tnoodle-cli-1.1.1'
export async function generateScrambles(discipline: Discipline, count: number) {
  const data =
    await $`vendor/${tnoodleCliVersion}/bin/tnoodle scramble --puzzle ${TNOODLE_DISCIPLINE_MAP[discipline]} --count ${count}`

  return data.stdout.toString().trim().split('\n')
}

export const DISCIPLINES = ['3by3', '2by2'] as const
export type Discipline = (typeof DISCIPLINES)[number]
const TNOODLE_DISCIPLINE_MAP: Record<Discipline, string> = {
  '3by3': 'three',
  '2by2': 'two',
} as const
