FROM node:16

WORKDIR /app

# to prevent reinstalling all modules firstly copy package.json
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build
