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