FROM node:8.9.4

COPY . /app/

WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build

WORKDIR /app/server
RUN npm install --registry=https://registry.npm.taobao.org

WORKDIR /app
EXPOSE 80
CMD ["npm", "run", "server"]
