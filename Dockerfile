FROM node:16

ENV NODE_ENV=production

WORKDIR /app

COPY package.json . 

RUN npm install --force

COPY . /app

EXPOSE 4000

CMD ["npm", "run", "generate"]
