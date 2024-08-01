# How to run

## Local dev

1. Create the .env files in the `root`, `server` and `client` folders. There are example for each file, see `.env.example`
2. Run `npm i` for each directory. You can split terminal for comfortable work
3. Run `npm run dev` for each directory. Thats it

### If you want work with local database
1. run `docker compose -f db-compose.yaml up --build -d`

## Docker
1. run `docker compose build`
2. run `docker compose up -d`