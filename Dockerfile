FROM daocloud.io/nginx

COPY . /app/
WORKDIR /app

RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build
COPY /dist /usr/share/nginx/html

EXPOSE 80
