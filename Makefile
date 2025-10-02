.PHONY: dev
dev:
	make -j 3 next-dev ngrok db-studio

.PHONY: next-dev
next-dev:
	yarn dev

.PHONY: ngrok
ngrok: 
	yarn ngrok

.PHONY: db-studio
db-studio:
	yarn db:studio

.PHONY: stop
stop:
	@echo "Stopping next-dev..."
	@pkill -f "yarn dev" || true
	@echo "Stopping ngrok..."
	@pkill -f "yarn ngrok" || true
	@echo "Stopping db-studio..."
	@pkill -f "yarn db:studio" || true