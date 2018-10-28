FROM node:8.9.4

COPY . /app/
WORKDIR /app
RUN yarn install

WORKDIR /app/server
RUN yarn install

WORKDIR /app
RUN npm run build
EXPOSE 7701
CMD ["npm", "run", "server"]
