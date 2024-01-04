FROM node:19-bullseye-slim

RUN mkdir /app/
WORKDIR /app/
COPY package*.json /app/
RUN npm install
COPY . /app/
EXPOSE 8000

CMD ["node", "index.js"]