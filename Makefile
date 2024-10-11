lint-frontend:
	make -C frontend lint

install:
	npm ci

build:
	npm run build

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	npx start-server -s ./frontend/build

develop:
	make start-backend & make start-frontend

