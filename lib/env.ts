import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    TNOODLE_SECRET: z.string(),
  },
  runtimeEnv: {
    TNOODLE_SECRET: process.env.TNOODLE_SECRET,
  },
})
