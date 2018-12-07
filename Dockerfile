FROM node:8.9.4

COPY . /app/

WORKDIR /app
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN npm install

WORKDIR /app
EXPOSE 80
CMD ["npm", "run", "server"]
