FROM node:16

WORKDIR /app

COPY package*.json ./
RUN apt update && apt install -y redis-tools

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
