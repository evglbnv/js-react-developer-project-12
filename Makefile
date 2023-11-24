lint-frontend:
	make -C frontend lint

install:
	npm install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -p 5000

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend