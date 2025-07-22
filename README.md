# vscubing-tnoodle

This repository contains [@vscubing](https://github.com/vscubing)'s microservice that acts as an HTTP wrapper for [tnoodle-cli](https://github.com/SpeedcuberOSS/tnoodle-cli/)

## API
- GET :3001/?discipline="3by3"|"2by2"&count=7

## Development

- Install:
```bash
bun install && bun run install-vendor
```
- Run:
```bash
bun run dev
```
- Test:
```bash
bun run test
```
- Use:
```bash
curl 'localhost:3001?discipline=3by3&count=7&secret=SECRET'
```
- Run a continerized version locally:
```bash
docker rm --force vscubing-tnoodle
docker build --platform=linux/amd64 -t vscubing-tnoodle .
docker run --name vscubing-tnoodle -p 3001:3001 vscubing-tnoodle
```
