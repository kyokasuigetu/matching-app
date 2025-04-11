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
	npx prisma generate
# PRISMA_DOTENV_PATH=.env.local npx prisma migrate dev --name $*

# マイグレーションしなおしてシードを行う
# npx prisma migrate reset --force
seed:
	npx prisma db seed
	npx prisma generate

# テスト用のDBを使う。シードも行わない。
vitest:
	DATABASE_URL="postgresql://testgres:password@localhost:5433/matching-db?schema=public" npx prisma migrate reset --force --skip-seed
	DATABASE_URL="postgresql://testgres:password@localhost:5433/matching-db?schema=public" npm run test
