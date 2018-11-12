FROM node:8.9.4

COPY . /app/
WORKDIR /app
RUN yarn install
RUN npm run build
RUN yarn install lerna
RUN lerna bootstrap

WORKDIR /app/server
RUN yarn install

WORKDIR /app
EXPOSE 80
CMD ["npm", "run", "server"]
