build:
	docker-compose build
start:
	docker-compose start
restart:
	docker-compose restart
stop:
	docker-compose stop
up:
	docker-compose up -d
down:
	docker-compose down
destroy:
	docker-compose down --rmi all --volumes --remove-orphans

# prisamのコマンド
migrate-%:
	npx prisma migrate dev --name $*
# PRISMA_DOTENV_PATH=.env.local npx prisma migrate dev --name $*
seed:
	npx prisma db seed