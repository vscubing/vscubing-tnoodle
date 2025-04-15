import { z } from 'zod'
import {
  DISCIPLINES,
  generateScrambles,
  tnoodleCliVersion,
} from './generate-scrambles'

// TODO: auth by secret token?
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
            count: z.preprocess((v) => Number(v), z.number().positive()),
          })
          .safeParse({
            discipline: rawSearchParams.get('discipline'),
            count: rawSearchParams.get('count'),
          })
        if (searchParamsError) {
          console.error('Invalid search params:\n' + searchParamsError.message)
          return new Response(
            'Invalid search params:\n' + searchParamsError.message,
            { status: 400 },
          )
        }

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
