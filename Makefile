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