FROM node:19-alpine

RUN mkdir /app/
WORKDIR /app/
COPY package*.json /app/
RUN npm install
COPY . /app/
EXPOSE 8000

CMD ["node", "proxy.js"]