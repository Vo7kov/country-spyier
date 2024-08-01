# How to run

## Local dev

1. Create the .env files in the `root`, `server` and `client` folders. There are example for each file, see `.env.example`
2. Run `npm i` for each directory. You can split terminal for comfortable work
3. Run `npm run dev` for each directory. Thats it

### If you want work with local database
1. Change directory to root
2. run `docker build -f db.dockerfile -t db-image .`
3. run `docker run -d --name db db-image`

## Docker
1. Change directory to root
2. run `docker compose build`
3. run `docker compose up -d`