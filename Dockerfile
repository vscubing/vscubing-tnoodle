# NOTE: can't use alpine because of java in tnoodle
FROM oven/bun:slim 

WORKDIR /app

COPY . .

RUN bun install --no-save --frozen-lockfile
RUN apt-get update && apt-get install curl unzip -y && bun run install-vendor
RUN bun run test

EXPOSE 3001

CMD bun run start
