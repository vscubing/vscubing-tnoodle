import { z } from 'zod'
import {
  DISCIPLINES,
  generateScrambles,
  tnoodleCliVersion,
} from './generate-scrambles'
import { env } from '../lib/env'

console.log(`${tnoodleCliVersion} started`)
Bun.serve({
  routes: {
    '/': {
      // ?discipline&count
      GET: async (req) => {
        console.log('\n' + req.url)
        const { searchParams: rawSearchParams } = new URL(req.url)
        const { data: searchParams, error: searchParamsError } = z
          .object({
            discipline: z.enum(DISCIPLINES),
            count: z.preprocess((v) => Number(v), z.literal(7)),
            secret: z.string(),
          })
          .safeParse(Object.fromEntries(rawSearchParams.entries()))
        if (searchParamsError) {
          console.error('Invalid search params:\n' + searchParamsError.message)
          return new Response(
            'Invalid search params:\n' + searchParamsError.message,
            { status: 400 },
          )
        }

        if (searchParams.secret !== env.TNOODLE_SECRET)
          return new Response('Incorrect secret.', { status: 401 })

        console.log(
          `Generating ${searchParams.count} scrambles for ${searchParams.discipline}...`,
        )
        const scrambles = z
          .array(z.string())
          .length(searchParams.count)
          .parse(
            await generateScrambles(
              searchParams.discipline,
              searchParams.count,
            ),
          )

        return Response.json(scrambles)
      },
    },
  },
  error(error) {
    console.error(error)
    return new Response(`Internal Error: ${error.message}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  },
})
